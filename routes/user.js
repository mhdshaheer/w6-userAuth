const express = require('express');
const user = express.Router();


user.get('/login',(req,res)=>{
    res.render('user/login')
});
user.get('/register',(req,res)=>{
    res.render('user/register')
});

user.post('/register',(req,res)=>{
console.log('data');
console.log(req.body)
res.json(req.body)
})

module.exports = user;
