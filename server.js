const express =require("express");
const app = express();
const hbs = require('hbs')
const connectDB = require('./db/connectDb');    //mongodb connection is imported
const path = require('path');

//=============================================

const userRoutes = require('./routes/user');    //specified the path
const adminRoutes = require('./routes/admin');
const router = require("./routes/user");


app.set('views',path.join(__dirname,'views'));   //set view engine
app.set('view engine','hbs');   
app.use(express.static('public'));


app.use('/user',userRoutes);    //route to user login
app.use('/admin',adminRoutes);  //route to admin login


//data from the req is undefined.Use these to get the data in json format . 
app.use(express.urlencoded({extended:true}));
app.use(express.json());


router.post('/register')



connectDB();    //calling mongodb connectDB

app.listen(3000,()=>{
    console.log("server is running on : http://localhost:3000/");
});