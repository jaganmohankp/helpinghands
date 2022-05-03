document.addEventListener('DOMContentLoaded', async function () {

var	adminrole = JSON.parse(sessionStorage.getItem('adminrole'));


var queryString = window.location.search;
var queryPath = window.location.pathname;
console.log('full query path :'+queryPath);
console.log('my queryString :'+queryString);

var  urlParams = new URLSearchParams(queryString);
var id = urlParams.get('id');
var orderid = id;
var itemstatus = urlParams.get('itemstatus');
var myitemstatus = itemstatus;
var reorder = urlParams.get('reorder');
var myreorder = reorder;
// All the arguments of the Page 
console.log('ID :'+id)	
console.log('itemstatus :'+itemstatus)	
console.log('reorder :'+reorder)	


	var	token = await JSON.parse(sessionStorage.getItem('adminAccessToken'));
	
	

	
				console.log('get request to server API...'+token);
				var resdata;
				if(token){
					// user account page
					
					await fetch('/adminauth/allocated', {
							headers: { 
							'Content-type': 'application/json',
							'Authorization':'Bearer '+token
							},
							method: 'GET'
							
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
								//if token is valid but order id is not the user/goback to index page
								if(data.myresult == 'User not Authenticated' || data.myresult =='Unknown Server Error'){
									document.location.href="/admin-login";
								}
								
							}); // end of Verify user token
							
							// the resdata.myresult db rows are the actual data for page
							var allocateddetails = 	resdata.myresult;
							
							
							
						//Load Order Items
						
						var allocateddetailsitems = document.querySelector('#allocateddetails-id');
						var allocateddetailsHtml = '';
						
						if (allocateddetails){
							
						
						
							allocateddetails.forEach(function (allocateditem , index) {
								
								 console.log("Loop iteration starts");
								var alluserstr = allocateditem.alluser;
								var alluserres = alluserstr.split(',');
								let arrlength = alluserres.length;
								arrlength = arrlength - 1;
								alluserres.forEach(function (myres, index){
									console.log(myres);
								})
								console.log(alluserres[0]);
								console.log(allocateditem.recievername);
								console.log(allocateditem.donorname);
								alluserstr = alluserres[0]
								var myres = alluserstr.split('_');
								
								
								var itemusername = 'Donating';
								var otherusername = '';
								var othertype = '';
								
								
								if(allocateditem.itemtype == 'Donating'){
									//its a receieving user
									 itemusername = allocateditem.donorname;
								console.log(allocateditem.donorname);
								otherusername = allocateditem.recievername;
								othertype = 'Recieving'
								
								}else{
									//its a donating user
									itemusername = allocateditem.recievername;
									console.log(allocateditem.recievername);
									otherusername = allocateditem.donorname;
									othertype = 'Donating'
								}
								 
								allocateddetailsHtml += `<tr>`
								allocateddetailsHtml += `<td class="cart_product" >`
								allocateddetailsHtml += `	<a href=""><img src="images/hhitems/${allocateditem.scat}.jpg" alt="" width="120" height="120"></a>`								
								allocateddetailsHtml += `</td>`
								allocateddetailsHtml += `<td class="cart_description" >`	
								allocateddetailsHtml += `	<h5 style="color: #FE980F;font-size: 16px;">${allocateditem.itemtype}</h5>`								
								allocateddetailsHtml += `	<h5>ItemName: ${allocateditem.itemname}</h5>`
								allocateddetailsHtml += `	<h5>UserName: ${itemusername}</h5>`
								
								allocateddetailsHtml += `	<h5>Location: ${allocateditem.itemaddress} ${allocateditem.itemlocation}</h5>`
								allocateddetailsHtml += `	<h5>Phone: ${allocateditem.itemphone}</h5>`
								//outofstockdetailsHtml += `	<h5>${myrack}</h5>`								
								allocateddetailsHtml += `</td>`
								allocateddetailsHtml += `<td class="cart_description">`
								allocateddetailsHtml += `	<h5 style="color: #FE980F;font-size: 16px;">${othertype}</h5>`								
								allocateddetailsHtml += `	<h5>UserName: ${otherusername}</h5>`
								allocateddetailsHtml += `	<h5>${allocateditem.adminapproval}</h5>`
								//outofstockdetailsHtml += `	<h5>Barcode: ${outofstockitem.barcode}</h5>`
								//outofstockdetailsHtml += `	<h5>Unit Price: \$${outofstockitem.product_price}</h5>`
								//outofstockdetailsHtml += `	<h5 style="color: #FE980F;font-size: 16px;">Interested Users: ${arrlength}</h5>`
								//outofstockdetailsHtml += `	<form   action="" style="max-width:160px" method="POST">`
								//outofstockdetailsHtml += `<br>	<select name="itemstatusid${outofstockitem.item_id}" id="itemstatusid${outofstockitem.item_id}">`
								
								//res.forEach(function (myres, index){
								//	console.log(myres);
								//	outofstockdetailsHtml += `	<option value="${myres}">${myres}</option>`
								//outofstockdetailsHtml += `	<option value="Available">Available</option>`
								//outofstockdetailsHtml += `	<option value="Outofstock">Outofstock</option>`
								//})
								
								//outofstockdetailsHtml += `	</select><br><br>`
								//outofstockdetailsHtml += `</form>`
								//outofstockdetailsHtml += `<input type="submit" class="outofstockitem-submit " data-id=${outofstockitem.product_id}>`
								//outofstockdetailsHtml += `<button type="submit" class="outofstockitem-submit Approved ${outofstockitem.itemtype}" value="Approved" data-id=${outofstockitem.item_id} >Approved</button>    `
								
								//outofstockdetailsHtml += `   <button type="submit" class="outofstockitem-submit Rejected ${outofstockitem.itemtype}" value="Rejected" data-id=${outofstockitem.item_id} >Rejected</button>`
								allocateddetailsHtml += `<p id='update-status-msg-${allocateditem.product_id}' style="color: green"></p>`
								allocateddetailsHtml += `</td>`
								
												
								allocateddetailsHtml += `</tr> `
								
							
							});
							
						}
						
						allocateddetailsitems.innerHTML = allocateddetailsHtml;
				}else{
					window.sessionStorage.removeItem('adminAccessToken');
					window.sessionStorage.removeItem('admin');
					document.location.href="/admin-login";
				}

 
});

// event listerner tasks at BODY LOGOUT
document.querySelector('body').addEventListener('click', async function (event) {


// Verify emp token
	var	token = await JSON.parse(sessionStorage.getItem('adminAccessToken'));
	console.log('get request to server API...'+token);
	var resdata;
	  await fetch('/adminauth/myverify', {
		headers: { 
		'Content-type': 'application/json',
		'Authorization':'Bearer '+token
		},
		method: 'GET'
		
	})
	.then(response => response.json())
	.then(data => {
			console.log(data)
			resdata=data
			
			if(data.userAuthenticated == 'authenticated'){
			sessionStorage.setItem('adminAccessToken', JSON.stringify(data.accessToken));
			sessionStorage.setItem('admin', JSON.stringify(data.user));
			}else{
			window.sessionStorage.removeItem('adminAccessToken');
			window.sessionStorage.removeItem('admin');
			document.location.href="/admin-login";
			}
			
		}); // end of Verify user token


	
var queryString = window.location.search;
var queryPath = window.location.pathname;
console.log('full query path :'+queryPath);
console.log('my queryString :'+queryString);

var  urlParams = new URLSearchParams(queryString);
var id = urlParams.get('id');
var orderid = id;
console.log('ID :'+id)	
//console.log(donatevar);

// All the arguments of the Page //ignored and handled by form value
//var itemstatus = urlParams.get('itemstatus');
//var myitemstatus = itemstatus;
//var reorder = urlParams.get('reorder');
//var myreorder = reorder;



	var	token = await JSON.parse(sessionStorage.getItem('adminAccessToken'));

	

	
	
	// logout clicked // handled in header bottom 
			if (event.target.className.search("myadminlogouttab") !== -1) {
				console.log('account myadminlogouttab clicked');
				// Clear Admin token and email
					window.sessionStorage.removeItem('adminAccessToken');
					window.sessionStorage.removeItem('admin');
					window.localStorage.removeItem('allorderlist');
					document.location.href="/admin-login";
				
			}// end of logout
			
	// stock-status-submit clicked // handled in header bottom 
	if (event.target.className.search("allocateditem-submit") !== -1) {
	event.preventDefault();	
	//POST form value cature.
	console.log('#itemstatusid'+event.target.dataset.id.trim())
	var itemstatusitem = document.querySelector('#itemstatusid'+event.target.dataset.id.trim());
	var myprodid = event.target.dataset.id.trim();
	var cls=event.target.className;
	var clsres = cls.split(' ');
	//var updatestatusmsgitem = document.querySelector('#update-status-msg-'+event.target.dataset.id.trim());
	//updatestatusmsgitem.innerHTML='';

	var myitemstatus=itemstatusitem.value.trim();
	
	console.log(' myprodid '+myprodid+' myitemstatus '+myitemstatus + cls +' Class name: ' +clsres[1] + clsres[2]);
	
	var	token = await JSON.parse(sessionStorage.getItem('adminAccessToken'));
				console.log('account outofstock-status-submit clicked');
				console.log(' itemstatus  outofstock :'+itemstatusitem.value )
				// Update prod status
					if(token){
					 await fetch('/adminauth/outofstockitemupdate', {
							headers: { 
							'Content-type': 'application/json',
							'Authorization':'Bearer '+token
							},
							method: 'POST',
							body: JSON.stringify({myprodid: myprodid,
							myitemstatus:myitemstatus,
							action:clsres[1],
							itemtype:clsres[2]}
							)
							
						})
						.then(response => response.json())
						.then(data => {
								console.log(data)
								resdata=data;
								if(resdata.myresult == 'success'){
								updatestatusmsgitem.innerHTML='Updated';
								}
								
								
							}); // end of  prod status
					//await location.reload();
				}// end of if token
				
				
				
			}// end of stock and item status
})