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
					
					await fetch('/adminauth/noallocate', {
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
							var noallocatedetails = 	resdata.myresult;
							
							
							
						//Load Order Items
						
						var noallocatedetailsitems = document.querySelector('#noallocate-id');
						var noallocatedetailsHtml = '';
						var ordercartsubtotalprice= parseFloat('0');
						if (noallocatedetails){
							
						
						
							noallocatedetails.forEach(function (noallocateitem , index) {
								
								 console.log("Loop iteration starts");
								var alluserstr = noallocateitem.alluser;
								var alluserres = alluserstr.split(',');
								let arrlength = alluserres.length;
								arrlength = arrlength - 1;
								alluserres.forEach(function (myres, index){
									console.log(myres);
								})
								console.log(alluserres[0]);
								console.log(noallocateitem.recievername);
								console.log(noallocateitem.donorname);
								
								
								var itemusername = 'Donating';
								
								if(noallocateitem.itemtype == 'Donating'){
									//its a receieving user
									 itemusername = noallocateitem.donorname;
								console.log(noallocateitem.donorname);
								}else{
									//its a donating user
									itemusername = noallocateitem.recievername;
									console.log(noallocateitem.recievername);
								}
								 
								noallocatedetailsHtml += `<tr>`
								noallocatedetailsHtml += `<td class="cart_product" >`
								noallocatedetailsHtml += `	<a href=""><img src="images/hhitems/${noallocateitem.scat}.jpg" alt="" width="120" height="120"></a>`								
								noallocatedetailsHtml += `</td>`
								noallocatedetailsHtml += `<td class="cart_description" >`	
								noallocatedetailsHtml += `	<h5 style="color: #FE980F;font-size: 16px;">${noallocateitem.itemtype}</h5>`								
								noallocatedetailsHtml += `	<h5>ItemName: ${noallocateitem.itemname}</h5>`
								noallocatedetailsHtml += `	<h5>UserName: ${itemusername}</h5>`
								
								noallocatedetailsHtml += `	<h5>Location: ${noallocateitem.itemaddress} ${noallocateitem.itemlocation}</h5>`
								noallocatedetailsHtml += `	<h5>Phone: ${noallocateitem.itemphone}</h5>`
								//outofstockdetailsHtml += `	<h5>${myrack}</h5>`								
								noallocatedetailsHtml += `</td>`
								noallocatedetailsHtml += `<td class="cart_description">`
								//outofstockdetailsHtml += `	<h5>Barcode: ${noallocateitem.barcode}</h5>`
								//outofstockdetailsHtml += `	<h5>Unit Price: \$${noallocateitem.product_price}</h5>`
								noallocatedetailsHtml += `	<h5 style="color: #FE980F;font-size: 16px;">Interested Users: ${arrlength}</h5>`
								noallocatedetailsHtml += `	<form   action="" style="max-width:160px" method="POST">`
								noallocatedetailsHtml += `<br>	<select name="itemstatusid${noallocateitem.item_id}" id="itemstatusid${noallocateitem.item_id}">`
								
								alluserres.forEach(function (myres, index){
									console.log(myres);
									noallocatedetailsHtml += `	<option value="${myres}">${myres}</option>`
								//outofstockdetailsHtml += `	<option value="Available">Available</option>`
								//outofstockdetailsHtml += `	<option value="Outofstock">Outofstock</option>`
								})
								
								noallocatedetailsHtml += `	</select><br><br>`
								noallocatedetailsHtml += `</form>`
								//outofstockdetailsHtml += `<input type="submit" class="noallocateitem-submit " data-id=${outofstockitem.product_id}>`
								noallocatedetailsHtml += `<button type="submit" class="noallocateitem-submit Approved ${noallocateitem.itemtype}" value="Approved" data-id=${noallocateitem.item_id} >Approved</button>    `
								
								noallocatedetailsHtml += `   <button type="submit" class="noallocateitem-submit Rejected ${noallocateitem.itemtype}" value="Rejected" data-id=${noallocateitem.item_id} >Rejected</button>`
								noallocatedetailsHtml += `<p id='update-status-msg-${noallocateitem.item_id}' style="color: green"></p>`
								noallocatedetailsHtml += `</td>`
								
												
								noallocatedetailsHtml += `</tr> `
								
							
							});
							
						}
						
						noallocatedetailsitems.innerHTML = noallocatedetailsHtml;
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
	if (event.target.className.search("noallocateitem-submit") !== -1) {
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
	if (myitemstatus != 'NotAssigned'){
	console.log(' myprodid '+myprodid+' myitemstatus '+myitemstatus + cls +' Class name: Approved Donating ' +clsres[1] + clsres[2]);
	
	var	token = await JSON.parse(sessionStorage.getItem('adminAccessToken'));
				console.log('account outofstock-status-submit clicked');
				console.log(' itemstatus  outofstock :'+itemstatusitem.value )
				// Update prod status
					if(token){
					 await fetch('/adminauth/itemupdate', {
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
								//updatestatusmsgitem.innerHTML='Updated';
								location.reload();
								}
								
								
							}); // end of  prod status
					//await location.reload();
				}// end of if token
				
				
	} // if NotAssigned
			}// end of stock and item status
})