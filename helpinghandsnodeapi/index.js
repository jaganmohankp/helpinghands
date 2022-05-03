const express = require('express');
const app = express();
const cors = require ('cors');
const dotenv = require('dotenv');
dotenv.config();

const userauth = require("./routes/user_auth_api.js");
const path = require("path");

const adminauth = require("./routes/admin_auth_api.js");
app.use(express.json());

app.use(cors());

app.use(express.urlencoded({extended:false}));

/*
app.get('/api',(req, res) => {
    //res.redirect('/index.html')
    res.send('API working')
})
*/
//route for  home api
app.use("/userauth",userauth);

//route for auth admin user register api
app.use("/adminauth",adminauth);


app.get('/admin-login',(req, res) => {
    res.sendFile(path.join(__dirname, 'public')+'/admin-login.html')
})

app.get('/admin-user',(req, res) => {
    res.sendFile(path.join(__dirname, 'public')+'/admin-user.html')
})


app.get('/admin-yetallocate',(req, res) => {
    res.sendFile(path.join(__dirname, 'public')+'/admin-yetallocate.html')
})


app.get('/admin-allocated',(req, res) => {
    res.sendFile(path.join(__dirname, 'public')+'/admin-allocated.html')
})
// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT,()=>{
    console.log('App is running in port '+process.env.PORT);
})

