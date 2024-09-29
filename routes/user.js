const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');


route.get('/login',(req,res)=>{
    res.render('user/login')
});
route.get('/register',(req,res)=>{
    res.render('user/register')
});

route.post('/register',userController.registerUser)

module.exports = route;
