const adminModel = require('../model/adminModel');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel')


const loadLogin = async (req,res)=>{
    res.render('admin/login')
}
const login =async (req,res)=>{
    try {
       const {username,password} = req.body;
       
       const admin = await adminModel.findOne({username});

       if(!admin){
        return res.render('admin/login',{message:'Invalid credentials'});
       }
       const isMatch = await bcrypt.compare(password,admin.password);
       console.log(isMatch,password,admin.password)

       if(!isMatch) return res.render('admin/login',{message : 'Incorrect password'});
       req.session.admin = true;
       res.render('admin/dashboard',{message:'Login successfull'})


    } catch (error) {
        res.send(error)
    }
}

const LoadDashboard = async (req,res)=>{
    try {
        const admin =req.session.admin;
        if(!admin) return res.redirect('/admin/login');

        const users = userModel.find({})

        res.render('admin/dashboard',{users})
    } catch (error) {
        
    }
}

module.exports = {
    loadLogin,
    login,
    LoadDashboard
}