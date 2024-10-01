const express =require("express");
const app = express();
const hbs = require('hbs')
const connectDB = require('./db/connectDb');    //mongodb connection is imported
const path = require('path');
const session = require('express-session');
const nocache = require('nocache');


//=============================================

//session and nocache middleware
app.use(nocache());
app.use(session({
    secret : 'keylocked',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*60*24}
}))



//data from the req is undefined.Use these to get the data in json format . 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userRoutes = require('./routes/user');    //specified the path
const adminRoutes = require('./routes/admin');
//  missed anything.....?


app.set('views',path.join(__dirname,'views'));   //set view engine
app.set('view engine','hbs');   
app.use(express.static('public'));


app.use('/user',userRoutes);    //route to user login
app.use('/admin',adminRoutes);  //route to admin login








connectDB();    //calling mongodb connectDB

app.listen(8001,()=>{
    console.log("server is running on : http://localhost:8001/");
});