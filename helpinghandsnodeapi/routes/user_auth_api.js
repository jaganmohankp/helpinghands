const express  = require('express');
let router = express.Router();
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
dotenv.config();
const {Pool,Client} = require('pg');
const jwt = require('jsonwebtoken');
const users = []
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
String? isVerified = 'notverified':

  router.get('/dbuser', async (req,res)=>{
    
    
    const queryText = 'select * from users;'
    
    pool.query(queryText, (err, result) => {
       
        if (err) {
            console.error('Error executing query', err.stack);
            res.send({myresult:'Error executing query'});
        }
        else {
            //res.send(result.rows);
            res.send(result.rows);
        }
    })

   
})

  router.get("/dbemployee",function(req,res){
      res.send({type:"GET"});
  });

 

 
  // EMP AUTH
//Application level middleware function
//verify token and give email as loginUser

var userAuthenticated=''
var accessToken=''
var myresult=''
//Application level middleware function
//this run for every api call
router.use(function authenticateToken(req,res,next){
    console.log("middleware start")
    const authHeader = req.headers['authorization'];
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);    
  
    if (token == null){
        //res.send({myresult:'No Token in Header'});
        //return

        myresult='anonymous'
        userAuthenticated='anonymous'
        accessToken=''
        console.log('inside the auth verify token null :' )
        next()
        return
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,body)=>{
        console.log('inside the auth verify')
        console.log(err)
        if(err){
            //res.send({myresult:'Invalid Token in Header'});
            console.log('verify auth err' )

            myresult='anonymous'
            userAuthenticated='anonymous'
            accessToken=''
            console.log('inside the auth verify :' +loginUser+'==='+userAuthenticated)
            res.send({myresult:'invalid token'});
            next()
            return
        }

        console.log('auth verify success')

        
        myresult='authenticated'
        userAuthenticated='authenticated'
        accessToken=token
        console.log('inside the auth verify userAuthenticated :')
        next()
        return
        
        
    });
})//End  middleware function

// ajax call for sign up user
router.post('/mysignup',async(req,res)=>{
    console.log('inside the sign up  auth');
    console.log(myresult+userAuthenticated+accessToken)
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        console.log(req.body)
        console.log(salt)
        console.log(hashedPassword)
        const user = {name:req.body.name,gender:req.body.gender,email:req.body.email,password:hashedPassword}
        users.push(user)

        const insertText = 'INSERT INTO users(username,gender, email,password) VALUES ($1,$2,$3,$4) RETURNING *';
        const values = [req.body.name,req.body.gender,req.body.email.toLowerCase(),hashedPassword];
        pool.query(insertText, values, (err, result) => {
        
            if (err) {
                console.log(err.stack);
                res.send({myresult:'Registration failed or Email Already exist'});
                //res.send(err.stack);
            }
            else {
                console.log(result.rows[0]);
                res.send({myresult:req.body.name+' Registration success'});
               // res.send(result.rows[0]);
               // res.send(result);
                // { name: 'brianc'}
            }
        })        
        
    // res.send({myresult:req.body.name+' Registration sucesss'});
    }catch(e){
        console.log(e)
        res.send({myresult:'Registration failed'});
    }
})//end of signup



// ajax call for login user
router.post('/mylogin',async(req,res)=>{
        
    console.log("post login api")
    console.log(req.body)
        
    const queryText = 'select * from users where email = $1';
    const values = [req.body.email.toLowerCase()];
    pool.query(queryText, values, async (err, result) => {
   
        if (err) {
            console.log(err.stack);
            //res.send({myresult:'Registration failed or Email Already exist'});
            res.send({myresult:'Server error',username:'dummy',email:'dummy',gender:"dummy",accessToken:"dummy",items:[]});
        return;
        }
        else {
            console.log(result.rows[0]);
           // res.send({myresult:req.body.name+' Registration sucesss'});
           // res.send(result.rows[0]);
          // res.send(result);
            // { name: 'brianc'}

            const user = result.rows[0];

          

            if(user == null){
                console.log('User not Found');
                res.send({myresult:"Email not Registered",username:"dummy",email:"dummy",gender:"dummy",accessToken:"dummy",items:[]});
                return;
            }else {

            try{
                    if(await bcrypt.compare(req.body.password,user.password)) {
                        //res.send({myresult:'User Logged in'});
        
                        const useremail = req.body.email;
        
                        const email = {email:useremail};
                        const accessToken= jwt.sign(email,process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });
                        console.log('User  Found');
                        console.log(accessToken)
                        myresult='Authenticated';
                       fetchItems(myresult,user.username,user.gender,user.email,accessToken,res);
                      //  res.send({myresult:'Authenticated',username:user.username,email:user.email,accessToken:accessToken,clothitems: await fetchClothItems(user.username)});
                      return;
                        
                    }else{
                        console.log('User  Found Wrong Password');
                        res.send({myresult:"Wrong Password",username:"dummy",email:"dummy",gender:"dummy",accessToken:"dummy",items:[]});
                        return;
                    }
                }catch(e){
                    console.log(e)
                    res.send({myresult:"Server error",username:"dummy",email:"dummy",gender:"dummy",accessToken:"dummy",items:[]});
                    return;
                }

            } // if user not null

        }
    

        
}
)
})//my login end
//function for my login
function  fetchItems(myresult,user,gender,email,accessToken,res){
    console.log('inside fetch user '+user);
    const clothitems =[];
    const eduitems =[];
    const fooditems =[];
    const homeutilsitems =[];
    const queryText = 'select * from items where donorname != $1 and recievername != $1';
    const values = [user];

    
    pool.query(queryText, values, async (err, result) => {
        
        
        res.send({myresult:myresult,username:user,email:email,gender:gender,accessToken:accessToken,items:result.rows});
        return ;
    })
    

   

}/// fuction for my login

//Password Reset:
router.post('/myreset',async(req,res)=>{
    console.log('inside the reset  auth');
    console.log(myresult+userAuthenticated+accessToken)
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        console.log(req.body)
        console.log(salt)
        console.log(hashedPassword)
        const user = {email:req.body.email,password:hashedPassword}
        users.push(user)

        const insertText = 'UPDATE "users"  SET  "password" = $2    WHERE "email" = $1';
					
        const values = [req.body.email.toLowerCase(),hashedPassword];
        pool.query(insertText, values, (err, result) => {
        
            if (err) {
                console.log(err.stack);
                console.log("error reset blk");
                res.send({myresult:'Server error'});
               
            }
            if(result.rowCount > 0) {
                console.log(result.rowCount);

                
                console.log("success reset blk");
                res.send({myresult:req.body.email+' Password Reset success'});
 
            }
            if(result.rowCount == 0) {
                console.log(result.rowCount);

                
                console.log("no rows updated");
                res.send({myresult:'Email not Registered'});
 
            }
        })        
         
    }catch(e){
        console.log(e)
        res.send({myresult:'Server error'});
    }
}) ////Password Reset: END

//Home to get all list
router.post('/myhome',async(req,res)=>{
    console.log('inside the myhome api');
    console.log(myresult+userAuthenticated+accessToken)
    console.log(req.body)

    if (userAuthenticated == 'authenticated'){
       // res.send({myresult:myresult});

        const queryText = 'select * from items where donorname != $1 and recievername != $1';
        const values = [req.body.username.toLowerCase()];

        pool.query(queryText, values, async (err, result) => {
   
            if (err) {
                console.log(err.stack);
                //res.send({myresult:'Registration failed or Email Already exist'});
                res.send({myresult:'Server Error',username:req.body.username,email:req.body.email,gender:req.body.gender,accessToken:accessToken,items:[{}]});
               return;
            }
            else {
                console.log(result.rows[0]);
               // res.send({myresult:req.body.name+' Registration sucesss'});
               // res.send(result.rows[0]);
              // res.send(result);
                // { name: 'brianc'}
    
                const items = result.rows;
    
                if(items == null){
                    console.log('No Items not Found');
                    res.send({myresult:'No Items',username:req.body.username,email:req.body.email,gender:req.body.gender,accessToken:accessToken,items:result.rows});
                    return;
                }
                res.send({myresult:'Authenticated',username:req.body.username,email:req.body.email,gender:req.body.gender,accessToken:accessToken,items:result.rows});
                return;
    
            }
        })


    }
})//my home


//Notify to get all list
router.post('/mynotify',async(req,res)=>{
    console.log('inside the notification');
    console.log(myresult+userAuthenticated+accessToken)
    console.log(req.body)

    
       // res.send({myresult:myresult});

        const queryText = 'select * from notifications where donorname = $1 or recievername = $1';
        const values = [req.body.username.toLowerCase()];

        pool.query(queryText, values, async (err, result) => {
   
            if (err) {
                console.log(err.stack);
                //res.send({myresult:'Registration failed or Email Already exist'});
                res.send({myresult:'Server Error',
                notificationsItem:[{}]});
               return;
            }
            else {
                console.log(result.rows[0]);
                console.log(result.rows.length);
               // res.send({myresult:req.body.name+' Registration sucesss'});
               // res.send(result.rows[0]);
              // res.send(result);
                // { name: 'brianc'}
    
                const notificationsItem = result.rows;
    
                if(notificationsItem == null){
                    console.log('No Items not Found');
                    res.send({myresult:'No Items',
                    notificationsItem:notificationsItem});
                    return;
                }
                res.send({myresult:'Authenticated',
                notificationsItem:notificationsItem});
                return;
    
            }
        })


    
})//my notify

//notification read
router.post('/mynotifyread',async(req,res)=>{
    console.log('inside the notification read');
    console.log(myresult+userAuthenticated+accessToken)
    console.log(req.body)
    const insertText = 'update "notifications" set "status" = $2 WHERE "notify_id" = $1';
					
        const values = [req.body.notifyId,'Read'];
        pool.query(insertText, values, (err, result) => {
        
            if (err) {
                console.log(err.stack);
                console.log("error reset blk");
                res.send({myresult:'Server error',allNotifyItem:[]});
               
            }
        })
        queryText = 'select * from notifications where donorname = $1 or recievername = $1';
					
        values = [req.body.username];
        pool.query(insertText, values, (err, result) => {
        
            if (err) {
                console.log(err.stack);
                console.log("error reset blk");
                res.send({myresult:'Server error',allNotifyItem:[]});
               
            }else{
                console.log(result.rows[0]);
                console.log(result.rows.length);
                const notificationsItem = result.rows;
                res.send({myresult:'Success',allNotifyItem:notificationsItem});
            }
        })
})//notify unread to read

//all user update

router.post('/myitemalluser',async(req,res)=>{
    console.log('inside the item all user ');
    console.log(myresult+userAuthenticated+accessToken)
    console.log(req.body)
    const insertText = 'update "items" set "alluser" = $2 WHERE "item_id" = $1';
					
        const values = [req.body.itemId,req.body.alluser];
        pool.query(insertText, values, (err, result) => {
        
            if (err) {
                console.log(err.stack);
                console.log("error reset blk");
                res.send({myresult:'Server error'});
               
            }else{
                console.log(result);
                res.send({myresult:'Success'});
            }
        })
        
})
//end of all user


//Home to get all list my drawer
router.post('/mydrawer',async(req,res)=>{
    console.log('inside the reset  auth');
    console.log(myresult+userAuthenticated+accessToken)
    console.log(req.body)

    if (userAuthenticated == 'authenticated'){
       // res.send({myresult:myresult});

        const queryText = 'select * from items where donorname = $1 or recievername = $1';
        const values = [req.body.username.toLowerCase()];

        pool.query(queryText, values, async (err, result) => {
   
            if (err) {
                console.log(err.stack);
                //res.send({myresult:'Registration failed or Email Already exist'});
                res.send({myresult:'Server Error',username:req.body.username,email:req.body.email,gender:req.body.gender,accessToken:accessToken,items:[{}]});
               return;
            }
            else {
                console.log(result.rows[0]);
               // res.send({myresult:req.body.name+' Registration sucesss'});
               // res.send(result.rows[0]);
              // res.send(result);
                // { name: 'brianc'}
    
                const items = result.rows;
    
                if(items == null){
                    console.log('No Items not Found');
                    res.send({myresult:'No Items',username:req.body.username,email:req.body.email,gender:req.body.gender,accessToken:accessToken,items:result.rows});
                    return;
                }
                res.send({myresult:'Authenticated',username:req.body.username,email:req.body.email,gender:req.body.gender,accessToken:accessToken,items:result.rows});
                return;
    
            }
        })


    }
})//my drawer


// ajax call for item post
router.post('/myitempost',async(req,res)=>{
    console.log('inside the sign up  auth');
    console.log(myresult+userAuthenticated+accessToken)
    try{
        
        console.log(req.body)

        const insertText = 'insert into items (itemname,itemtype,mcat,scat,description,imagepath,donorname,recievername,itemaddress,itemlocation,itemphone,alluser,adminapproval)  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *';
        const values = [req.body.itemname,req.body.itemtype,req.body.mcat,req.body.scat,
            req.body.description,req.body.imagepath,req.body.donorname,req.body.recievername,
            req.body.itemaddress,req.body.itemlocation,req.body.itemphone,req.body.alluser,
            req.body.adminapproval        
        ];
        pool.query(insertText, values, (err, result) => {
        
            if (err) {
                console.log(err.stack);
               // res.send({myresult:'Registration failed or Email Already exist'});
                //res.send(err.stack);
                res.send({myresult:'Error',itemname:'dummy' });
                return;
            }
            else {
                console.log(result.rows[0]);
               // res.send({myresult:req.body.name+' Registration success'});
               // res.send(result.rows[0]);
               // res.send(result);
                // { name: 'brianc'}
                const item = result.rows[0];
                res.send({myresult:'Success',itemname:item.itemname });
                return;
            }
        })        
        
    // res.send({myresult:req.body.name+' Registration sucesss'});
    }catch(e){
        console.log(e)
      //  res.send({myresult:'Registration failed'});
      res.send({myresult:'Error',itemname:'dummy' });
      return;
    }
})//end of itempost


// ajax call for item delete
router.post('/myitemdel',async(req,res)=>{
    console.log('inside the sign up  auth');
    console.log(myresult+userAuthenticated+accessToken)
    try{
        
        console.log(req.body)

        const insertText = 'delete from items where item_id = $1 RETURNING *';
        const values = [req.body.itemId];
        pool.query(insertText, values, (err, result) => {
        
            if (err) {
                console.log(err.stack);
               // res.send({myresult:'Registration failed or Email Already exist'});
                //res.send(err.stack);
                res.send({myresult:'Error',itemname:'dummy' });
                return;
            }
            else {
                //console.log(result);
               // res.send({myresult:req.body.name+' Registration success'});
               // res.send(result.rows[0]);
               // res.send(result);
                // { name: 'brianc'}
                if(result.rowCount == 0){
                    res.send({myresult:'Item Not Found',itemname:"dummy" });
                    return;
                }else{
                const item = result.rows[0];
                res.send({myresult:'Success',itemname:item.itemname });
                return;
                    }
            }
        })        
        
    // res.send({myresult:req.body.name+' Registration sucesss'});
    }catch(e){
        console.log(e)
      //  res.send({myresult:'Registration failed'});
      res.send({myresult:'Error',itemname:'dummy' });
      return;
    }
})//end of itemdelete

module.exports = router;