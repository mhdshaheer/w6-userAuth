const userSchema = require('../model/userModel');

const registerUser = async (req,res)=>{
    try {
        const {username,password} = req.body;

        const user = await userSchema.findOne({username});

        if(user){
            return res.render('user/register',{message:'Username is already exist'})
        }
 
        const newUser = new userSchema({
            username,
            password,
        });
        await newUser.save();
        res.render('user/login',{message:'Username is created succesfully'});


    } catch (error) {

    }
}

const login = async (req,res)=>{
    try {
        const {username,password} =req.body;
        const user = await userSchema.findOne({username});

        if(!user){
            return res.render('user/login',{message:'User does not exist'});

        }
        if(user.password !== password ){
            return res.render('user/login',{message:'Incorrect password'})
        }
        res.render('user/home',{message:'login successful'})

    } catch (error) {
        
    }
}

const loadLogin = (req,res)=>{
    res.render('user/login');
};
const loadRegister = (req,res) =>{
    res.render('user/register')
}

module.exports = {
    registerUser,
    loadLogin,
    loadRegister,
}