const userSchema = require('../model/userModel');
const bcrypt = require('bcrypt');
const saltround = 10;

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userSchema.findOne({ username });

        if (user) {
            return res.render('user/register', { message: 'Username is already exist' })
        }
        const hashedPassword = await bcrypt.hash(password, saltround);
        const newUser = new userSchema({
            username,
            password: hashedPassword,
        });
        await newUser.save();
        res.render('user/login', { message: 'Username is created succesfully' });


    } catch (error) {
        res.render('user/register', { message: 'Something went wrong' })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userSchema.findOne({username});
        

        if (!user) {
            return res.render('user/login', { message: 'User does not exist' });

        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) res.render('user/login',{message:'password incorrect'})
        res.render('user/home');

    } catch (error) {
        res.render('user/login', { message: 'Something went wrong' })
    }
}

const loadLogin = (req, res) => {
    res.render('user/login');
};
const loadRegister = (req, res) => {
    res.render('user/register')
};
const loadHome = (req,res)=>{
    res.render('user/home');
}

module.exports = {
    registerUser,
    login,
    loadLogin,
    loadRegister,
    loadHome
}