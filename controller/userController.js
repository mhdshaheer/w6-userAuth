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

module.exports = {registerUser}