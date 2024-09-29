const express = require('express');
const route = express.Router();


route.get('/login',(req,res)=>{
    res.render('user/login')
});
route.get('/register',(req,res)=>{
    res.render('user/register')
});

route.post('/register',(req,res)=>{
console.log('data');
console.log(req.body)
res.json(req.body)
})

module.exports = route;
