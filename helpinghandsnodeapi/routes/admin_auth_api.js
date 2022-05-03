const express  = require('express');
let router = express.Router();
const cors = require ('cors');
const dotenv = require('dotenv');
dotenv.config();
const {Pool,Client} = require('pg');
const path = require("path");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
const users = []

// ADMIN AUTH
//Application level middleware function
//verify token and give email as loginUser
var loginUser=''
var userAuthenticated=''
var accessToken=''
var myresult=''
//Application level middleware function
//this run for every api call
router.use(function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);    
  
    if (token == null){
        //res.send({myresult:'No Token in Header'});
        //return

        myresult='anonymous'
        loginUser='anonymous'
        userAuthenticated='anonymous'
        accessToken=''
        console.log('inside the auth verify :' +loginUser+'==='+userAuthenticated)
        next()
        return
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        console.log('inside the auth verify')
        console.log(err)
        if(err){
            //res.send({myresult:'Invalid Token in Header'});
            console.log('verify auth err')

            myresult='anonymous'
            loginUser='anonymous'
            userAuthenticated='anonymous'
            accessToken=''
            console.log('inside the auth verify :' +loginUser+'==='+userAuthenticated)
            next()
            return
        }

        console.log('auth verify success')
        
        myresult='authenticated'
        loginUser=user.email
        userAuthenticated='authenticated'
        accessToken=token
        console.log('inside the auth verify :' +loginUser+'==='+userAuthenticated)
        next()
        return
        
        
    });
})//End  middleware function
// out put of middleware fn for unauthorised token
//{myresult: "User not Authenticated", user: "anonymous", userAuthenticated: "anonymous", accessToken: ""}
// out put of middleware fn for authorised token
//{myresult: "success or json ", user: "tokenemail", userAuthenticated: "authenticated", accessToken:accessToken}





// verify the jwt user token //
  router.get('/myverify',  (req, res) => {
    console.log('inside the final block of verify auth');
    console.log(myresult+loginUser+userAuthenticated+accessToken)
    res.send({myresult:myresult,user:loginUser,userAuthenticated:userAuthenticated,accessToken:accessToken});
  })




//ADMIN AUTH
// ajax call for login user//
router.post('/mylogin',async(req,res)=>{
    console.log(req.body)


    const queryText = 'select * from users where email = $1';
    const values = [req.body.email];
    pool.query(queryText, values, async (err, result) => {
   
        if (err) {
            console.log(err.stack);
            //res.send({myresult:'Registration failed or Email Already exist'});
            res.send(err.stack);
        }
        else {
            console.log(result.rows[0]);
           // res.send({myresult:req.body.name+' Registration sucesss'});
           // res.send(result.rows[0]);
          // res.send(result);
            // { name: 'brianc'}

            const user = result.rows[0];

            if(user == null){
                res.send({myresult:'User not Found'});
            }

            try{
                if(await bcrypt.compare(req.body.password,user.password)){
                    //res.send({myresult:'User Logged in'});
    
                    const useremail = req.body.email;
    
                    const email = {email:useremail};
                    const accessToken= jwt.sign(email,process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
                    console.log(accessToken)
                    res.send({accessToken:accessToken,user:user.name});
    
                    
                }else{
                    res.send({myresult:'Wrong Password'});
                }
            }catch(e){
                console.log(e)
                res.send({myresult:'Unknown Server Error'});
            }

        }
    })

    //const user = users.find(user=>user.email == req.body.email)

    //console.log(user)
        
})


//ADMIN AUTH
// Verify token and get the user account from DB
router.post('/myaccount',  (req, res) => {
    console.log('inside the account api');
    console.log(myresult+loginUser+userAuthenticated+accessToken)

    const queryText = 'select * from eshop_admins where email = $1';
    const values = [loginUser];
	
	pool.query(queryText, values, async (err, result) => {
		
        if (err) {
            console.log(err.stack);
            //res.send({myresult:'Registration failed or Email Already exist'});
            res.send(err.stack);
        }
        else {
            console.log(result.rows[0]);
           // res.send({myresult:req.body.name+' Registration sucesss'});
           // res.send(result.rows[0]);
          // res.send(result);
            // { name: 'brianc'}

            try{

                const user = result.rows[0];
			    myresult={
				user_id:user.user_id,
				name:user.name,
				email:user.email,
                phone:user.phone,
                address:user.address
				
			}
			res.send({myresult:myresult,user:loginUser,userAuthenticated:userAuthenticated,accessToken:accessToken});
           

            }catch(e){
                console.log(e)
                res.send({myresult:"Unknown Server Error",user:loginUser,userAuthenticated:userAuthenticated,accessToken:accessToken});
          
            }

            

        }
	})
	
})// verify and get myaccount




//ADMIN AUTH 
// get the Out of STOCK
router.get('/noallocate', async (req, res) => {

    console.log('inside the Out of STOCK admin');
    var myadminstatus = 'Pending';

    var myresult;

    console.log(myresult+loginUser+userAuthenticated+accessToken);
    
	
	//check for token is authenticated
    //
    if(userAuthenticated=='authenticated'){
		
		// Stage 1 get details of orders address and total cost //expected 1 row

		queryText = 'select * from items where adminapproval = $1';
		values = [myadminstatus];
		
		pool.query(queryText, values, async (err, result) => {
		
        if (err) {
            console.log(err.stack);
            
            res.send(err.stack);
        }
        else {
			    console.log(result.rows);
			   // res.send({myresult:req.body.name+' Registration sucesss'});
			   // res.send(result.rows[0]);
			 
				res.send({myresult:result.rows,user:loginUser,userAuthenticated:userAuthenticated,accessToken:accessToken});

			}
		})// end of stage1 query

		
	}else {
		res.send({myresult:'User not Authenticated',user:loginUser,userAuthenticated:userAuthenticated,accessToken:accessToken});
	}// end of if user authenticated
	

  })//end of  get Out of STOCK

//ADMIN AUTH 
// get the Out of STOCK02
router.get('/allocated', async (req, res) => {

    console.log('inside the Out of STOCK admin');
    var myadminstatus = 'Pending';

    var myresult;

    console.log(myresult+loginUser+userAuthenticated+accessToken);
    
	
	//check for token is authenticated
    //
    if(userAuthenticated=='authenticated'){
		
		// Stage 1 get details of orders address and total cost //expected 1 row

		queryText = 'select * from items where adminapproval != $1';
		values = [myadminstatus];
		
		pool.query(queryText, values, async (err, result) => {
		
        if (err) {
            console.log(err.stack);
            
            res.send(err.stack);
        }
        else {
			    console.log(result.rows);
			   // res.send({myresult:req.body.name+' Registration sucesss'});
			   // res.send(result.rows[0]);
			 
				res.send({myresult:result.rows,user:loginUser,userAuthenticated:userAuthenticated,accessToken:accessToken});

			}
		})// end of stage1 query

		
	}else {
		res.send({myresult:'User not Authenticated',user:loginUser,userAuthenticated:userAuthenticated,accessToken:accessToken});
	}// end of if user authenticated
	

  })//end of  get Out of STOCK02

//ADMIN AUTH 
// post the Out of STOCK update
router.post('/itemupdate', async (req, res) => {

    console.log('inside the itemupdate  admin');
    console.log('inside Update Order status');
    console.log(req.body);

var myprodid = req.body.myprodid;
var myitemstatus = req.body.myitemstatus;
var action = req.body.action;
if(req.body.myitemstatus != 'NotAssigned'){

    var myresult;

    console.log(myresult+loginUser+userAuthenticated+accessToken);
    
	
	//check for token is authenticated
    //
    if(userAuthenticated=='authenticated'){
		
		// Stage 1 update product status //expected 1 row
        if(req.body.itemtype == 'Donating'){
             queryText = 'update items  SET recievername = $2 , adminapproval = $3 WHERE item_id = $1  RETURNING *';
        }else{
             queryText = 'update items  SET donorname = $2 , adminapproval = $3 WHERE item_id = $1  RETURNING *';
        }
		
		const values = [req.body.myprodid,req.body.myitemstatus,req.body.action];
		
		 pool.query(queryText, values, async (err, result) => {
		
        if (err) {
            console.log(err.stack);
            
            res.send(err.stack);
        }
        else {
			   console.log(result.rows[0]);
               const item = result.rows[0];
               const status = "Unread";
               insertNotification(myprodid,myitemstatus,action,
                item.donorname,item.recievername,item.itemname,
                item.imagepath,item.adminapproval,status);

			res.send({myresult:"success",user:loginUser,
            userAuthenticated:userAuthenticated,accessToken:accessToken});
         
			}
		})// end of stage1 query

		
	}else {
		res.send({myresult:'User not Authenticated',user:loginUser,userAuthenticated:userAuthenticated,accessToken:accessToken});
	}// end of if user authenticated
	
}// end of if ignorenull
	

  })//end of  Out of item update

  function  insertNotification(myprodid,myitemstatus,action,
    donorname,recievername,itemname,
    imagepath,adminapproval,status){
        console.log("inside notification")
            console.log(myprodid+myitemstatus+action);
            console.log(donorname+recievername+itemname);
            console.log(imagepath+adminapproval+status);

            const insertText = 'insert into notifications (donorname,recievername,itemname,imagepath,adminapproval,status)  VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
            const values = [donorname,recievername,itemname,imagepath,adminapproval,status];

            pool.query(insertText, values, async (err, result) => {

                if (err) {
                    console.log(err.stack);
                    
                    res.send(err.stack);
                } else {
                    console.log(result.rows[0]);
                    const item = result.rows[0];
              
                 }

            });

        return;

  } // End of insert notify

//ADMIN AUTH 
// get the Out of STOCK count
router.get('/noallocatedcount', async (req, res) => {
	
	var myproductstatus = 'Pending';
    var myresult;

    console.log(myresult+loginUser+userAuthenticated+accessToken);
    
	
	//check for token is authenticated
    //
    if(userAuthenticated=='authenticated'){
		
		// Stage 1 count product status //expected 1 row

		const queryText = 'select count(*)  FROM   items where lower(adminapproval) =  $1';
		const values = [myproductstatus.trim().toLowerCase()];
		
		await pool.query(queryText, values, async (err, result) => {
		
        if (err) {
            console.log(err.stack);
            
            res.send(err.stack);
        }
        else {
			   console.log(result.rows);
				myresult = result.rows[0];
               
			res.send({myresult:myresult,user:loginUser,userAuthenticated:userAuthenticated,accessToken:accessToken});
         
			}
		})// end of stage1 query

		
	}else {
		res.send({myresult:'User not Authenticated',user:loginUser,userAuthenticated:userAuthenticated,accessToken:accessToken});
	}// end of if user authenticated

  })//end of  Out of STOCK count

  //ADMIN AUTH 
// get the Out of STOCK count
router.get('/allocatedcount', async (req, res) => {
	
	var myproductstatus = 'Pending';
    var myresult;

    console.log(myresult+loginUser+userAuthenticated+accessToken);
    
	
	//check for token is authenticated
    //
    if(userAuthenticated=='authenticated'){
		
		// Stage 1 count product status //expected 1 row

		const queryText = 'select count(*)  FROM   items where lower(adminapproval) !=  $1';
		const values = [myproductstatus.trim().toLowerCase()];
		
		await pool.query(queryText, values, async (err, result) => {
		
        if (err) {
            console.log(err.stack);
            
            res.send(err.stack);
        }
        else {
			   console.log(result.rows);
				myresult = result.rows[0];
               
			res.send({myresult:myresult,user:loginUser,userAuthenticated:userAuthenticated,accessToken:accessToken});
         
			}
		})// end of stage1 query

		
	}else {
		res.send({myresult:'User not Authenticated',user:loginUser,userAuthenticated:userAuthenticated,accessToken:accessToken});
	}// end of if user authenticated

  })//end of  Out of STOCK count

module.exports = router;