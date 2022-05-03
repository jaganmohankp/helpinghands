document.addEventListener('DOMContentLoaded', async function () {
	
	
	// Verify user token // load index if user is null
	var	token = await JSON.parse(sessionStorage.getItem('adminAccessToken'));
	console.log('get request to server API...'+token);
	
	if(token){


	var	token = await JSON.parse(sessionStorage.getItem('adminAccessToken'));
	console.log('get request to server API...'+token);
	//outofstock count
	  await fetch('/adminauth/allocatedcount', {
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
			var allocatedspaniditems = document.querySelector('#allocatedspanid');
			allocatedspaniditems.innerHTML = data.myresult.count;
			
		}); 
}else{
	window.sessionStorage.removeItem('adminAccessToken');
	window.sessionStorage.removeItem('admin');
	document.location.href="/admin-login";
}// end of outofstock count

})