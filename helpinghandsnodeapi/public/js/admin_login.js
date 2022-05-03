// for dynamic data event listening on body tag
document.querySelector('body').addEventListener('click', async function (event) {
	
    console.log(event.target);
	console.log(event.target.className);
	

		
		if (event.target.className.search("adminlogin") !== -1) {
			event.preventDefault();
			console.log('login btn clicked')
			var errormsgitem = document.querySelector('#error-msg-id');
			errormsgitem.innerHTML = '';
			var successmsgitem = document.querySelector('#success-msg-id');
			successmsgitem.innerHTML = '';
			
			var lemail = document.querySelector('#lemail');
			console.log('email'+lemail.value);
			
			var lpassword = document.querySelector('#lpassword');
			console.log('password'+lemail.value);
			
			if(lemail.value != '' && lpassword.value != '' ){
				
				console.log('all fields ok')
				
				var formdatajson ={
						"email":lemail.value.trim(),
						"password":lpassword.value.trim()
					}
					
					console.log(formdatajson);
					
					// Verify ADMIN login
						console.log('Posting request to server API...');
						  await fetch('/adminauth/mylogin', {
							headers: { 
							'Content-type': 'application/json'							
							},
							method: 'POST',
							body: JSON.stringify(formdatajson)
						})
						.then(response => response.json())
						.then(data => {
								console.log(data)
								
								//successmsgitem.innerHTML = data;
								
								if(data.myresult){
									//do nothing 
									errormsgitem.innerHTML = data.myresult;
								}else {
								
								sessionStorage.setItem('adminAccessToken', JSON.stringify(data.accessToken));
								sessionStorage.setItem('admin', JSON.stringify(data.user));
								document.location.href="/admin-user";
								}
								
							}); // end of new admin login
				
				
			}else{
				
				
				console.log('some fields still empty')
				errormsgitem.innerHTML = 'Please fill all fields for Login'
			}
			
			
		}
		
		
		if (event.target.className.search("admincheckbox") !== -1) {
			event.preventDefault();
			var errormsgitem = document.querySelector('#error-msg-id');
			errormsgitem.innerHTML = '';
			var successmsgitem = document.querySelector('#success-msg-id');
			successmsgitem.innerHTML = '';
			
			var formdatajson ={
						"email":"dummy email",
						"password":"dummy password"
					}
					
				
			
					// Verify ADMIN token
					var	token = await JSON.parse(sessionStorage.getItem('adminAccessToken'));
						console.log('get request to server API...'+token);
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
								
								successmsgitem.innerHTML = data.myresult;
								
								//sessionStorage.setItem('adminAccessToken', JSON.stringify(data.accessToken));
								
							}); // end of new admin login
		}
		
})