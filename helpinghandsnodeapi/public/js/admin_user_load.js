document.addEventListener('DOMContentLoaded', async function () {
	
	
	// Verify user token // load index if user is null
	var	token = await JSON.parse(sessionStorage.getItem('adminAccessToken'));
	console.log('get request to server API...'+token);
	
	if(token){
			  await fetch('/adminauth/myaccount', {
							headers: { 
							'Content-type': 'application/json',
							'Authorization':'Bearer '+token
							},
							method: 'POST'
							
						})
						.then(response => response.json())
						.then(data => {
								console.log(data)
								resdata=data;
								if(data.userAuthenticated == 'authenticated'){
								sessionStorage.setItem('adminAccessToken', JSON.stringify(data.accessToken));
								sessionStorage.setItem('admin', JSON.stringify(data.user));
								}else{
								window.sessionStorage.removeItem('adminAccessToken');
								window.sessionStorage.removeItem('admin');
								document.location.href="/admin-login";
								}
								
							}); // end of Verify admin token
							
							// the resdata.myresult db rows are the actual data for page
							var data = 	resdata.myresult;
						
							// Parse the admin details for myaccount profile
							if(resdata.myresult){
								dbuserid = resdata.myresult.user_id
								dbusername = resdata.myresult.name
								dbuseremail = resdata.myresult.email
								dbuserphone = resdata.myresult.phone
								dbuseraddress = resdata.myresult.address
								
								if(dbuseraddress != null){
									arraddress = dbuseraddress.split('<=>');
								
										if(arraddress){

											dbachome=arraddress[0];
											dbacunit=arraddress[1];
											dbacaddress1=arraddress[2];
											dbacaddress2=arraddress[3];
											dbaccountry=arraddress[4];
											dbacpostal=arraddress[5];

										}else{
											dbachome=''
											dbacunit=''
											dbacaddress1=''
											dbacaddress2=''
											dbaccountry=''
											dbacpostal=''
										}	
								}else{
											dbachome=''
											dbacunit=''
											dbacaddress1=''
											dbacaddress2=''
											dbaccountry=''
											dbacpostal=''
								}
							}
				
		var useraccountcontentitems = document.querySelector('#admin-account-content-id');
		var useracHtml ='';
				
				useracHtml += `<div class="row  padding-right">`
				useracHtml += `	<div class="col-sm-3 padding-right">`
				useracHtml += `		<div class="shopper-info">`
				useracHtml += `			<p>Admin Details</p>`
				useracHtml += `			<form>`
				if(dbusername){
				useracHtml += `				<input type="text" id="acname" name="name" placeholder="Name" value="${dbusername}" >`
				}else{
				useracHtml += `				<input type="text" id="acname" name="name" placeholder="Name"  >`	
				}
				
				if(dbuseremail){
				useracHtml += `				<input type="email" id="acemail" name="email" placeholder="Email" value="${dbuseremail}" >`
				}else{
				useracHtml += `				<input type="email" id="acemail" name="email" placeholder="Email"  >`
				}
					
				if(dbuserphone){
				useracHtml += `				<input type="tel" id="acphone" name="phone" placeholder="Phone (8 numbers only)" pattern="[0-9]{3}[0-9]{2}[0-9]{3}" value="${dbuserphone}" >`
				}else{
				useracHtml += `				<input type="tel" id="acphone" name="phone" placeholder="Phone (8 numbers only)" pattern="[0-9]{3}[0-9]{2}[0-9]{3}"  >`
				}	
					
				useracHtml += `			</form>`
				useracHtml += `		</div>`
				useracHtml += `	</div>`
				useracHtml += `	<div class="col-sm-5 clearfix padding-right">`
				useracHtml += `		<div class="bill-to">`
				useracHtml += `			<p>Shippment Address</p>`
				useracHtml += `			<div class="form-one">`
				useracHtml += `				<form>`
				
				if(dbachome){
				useracHtml += `					<input type="text" id="achome"  placeholder="Condo/Hdb/Home" value="${dbachome}">	`
				}else{
					useracHtml += `					<input type="text" id="achome"  placeholder="Condo/Hdb/Home" >	`
				}	
					
				if(dbacaddress1){
				useracHtml += `					<input type="text" id="acaddress1" placeholder="Address 1" value="${dbacaddress1}">`
				}else{
					useracHtml += `					<input type="text" id="acaddress1" placeholder="Address 1" >`
				}	
					
				if(dbaccountry){
				useracHtml += `					<input type="text" id="accountry" placeholder="Country" value="${dbaccountry}">`
				}else{
					useracHtml += `					<input type="text" id="accountry" placeholder="Country" >`
				}	
					
				
				useracHtml += `				</form>`
				useracHtml += `			</div>`
				useracHtml += `			<div class="form-two">`
				useracHtml += `				<form>`
				
				if(dbacunit){
				useracHtml += `					<input type="text" id="acunit"  placeholder="Floor-Unit No" value="${dbacunit}">`
				}else{
				useracHtml += `					<input type="text" id="acunit"  placeholder="Floor-Unit No" >`
				}	
					
				if(dbacaddress2){
				useracHtml += `					<input type="text" id="acaddress2" placeholder="Address 2" value="${dbacaddress2}">`
				}else{
				useracHtml += `					<input type="text" id="acaddress2" placeholder="Address 2" >`
				}	
					
				if(dbacpostal){
				useracHtml += `					<input type="text" id="acpostal" placeholder="Zip / Postal Code" value="${dbacpostal}">`
				}else{
				useracHtml += `					<input type="text" id="acpostal" placeholder="Zip / Postal Code" >`
				}
				
				useracHtml += `				</form>`
				useracHtml += `				<button class="btn btn-primary myaccountprofilesave mycursor" >Save</button>`				
				useracHtml += `			</div>`
				useracHtml += `		</div>`
				useracHtml += `	</div>`
				useracHtml += `</div>`
				
				useraccountcontentitems.innerHTML=useracHtml;
				
			//await outofstockcount();
				
	}else{
		window.sessionStorage.removeItem('adminAccessToken');
		window.sessionStorage.removeItem('admin');
		document.location.href="/admin-login";
	}
	
	
})

// event listerner tasks at BODY LOGOUT
document.querySelector('body').addEventListener('click', async function (event) {
	// logout clicked // handled in header bottom 
			if (event.target.className.search("myadminlogouttab") !== -1) {
				console.log('account myadminlogouttab clicked');
				// Clear Admin token and email
					window.sessionStorage.removeItem('adminAccessToken');
					window.sessionStorage.removeItem('admin');
					window.localStorage.removeItem('allorderlist');
					document.location.href="/admin-login";
				
			}// end of logout
})

// event listerner tasks at SECTION
document.querySelector('section').addEventListener('click', async function (event) {
	//event.preventDefault();
	    console.log(event.target);
	console.log(event.target.className);
	
		var usererrormsgitems = document.querySelector('#admin-error-msg-id');
		usererrormsgitems.innerHTML='';
		var usersuccessmsgitems = document.querySelector('#admin-success-msg-id');
		usersuccessmsgitems.innerHTML='';
	
	var	token = await JSON.parse(sessionStorage.getItem('adminAccessToken'));
				console.log('get request to server API...'+token);
				var resdata;
				if(token){
					// admin account page
					
					await fetch('/adminauth/myaccount', {
							headers: { 
							'Content-type': 'application/json',
							'Authorization':'Bearer '+token
							},
							method: 'POST'
							
						})
						.then(response => response.json())
						.then(data => {
								console.log(data)
								resdata=data;
								if(data.userAuthenticated == 'authenticated'){
								sessionStorage.setItem('adminAccessToken', JSON.stringify(data.accessToken));
								sessionStorage.setItem('admin', JSON.stringify(data.user));
								}else{
								window.sessionStorage.removeItem('adminAccessToken');
								window.sessionStorage.removeItem('admin');
								document.location.href="/admin-login";
								}
								
							}); // end of Verify admin token
							
							// the resdata.myresult db rows are the actual data for page
							var data = 	resdata.myresult;
							
					
				}else{
				document.location.href="/admin-login";
				}
				
							// the resdata.myresult db rows are the actual data for page
							var data = 	resdata.myresult;
							
							// Parse the User details for myaccount profile
							if(resdata.myresult){
								dbuserid = resdata.myresult.user_id
								dbusername = resdata.myresult.name
								dbuseremail = resdata.myresult.email
								dbuserphone = resdata.myresult.phone
								dbuseraddress = resdata.myresult.address
								
								if(dbuseraddress != null){
									arraddress = dbuseraddress.split('<=>');
								
										if(arraddress){

											dbachome=arraddress[0];
											dbacunit=arraddress[1];
											dbacaddress1=arraddress[2];
											dbacaddress2=arraddress[3];
											dbaccountry=arraddress[4];
											dbacpostal=arraddress[5];

										}else{
											dbachome=''
											dbacunit=''
											dbacaddress1=''
											dbacaddress2=''
											dbaccountry=''
											dbacpostal=''
										}	
								}else{
											dbachome=''
											dbacunit=''
											dbacaddress1=''
											dbacaddress2=''
											dbaccountry=''
											dbacpostal=''
								}
							}
	
	
	
	var useraccountcontentitems = document.querySelector('#admin-account-content-id');
	var useracHtml ='';


			
			

			
			
			

})

