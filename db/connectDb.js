const mongoose = require('mongoose');
const connectDB = async()=>{
    console.log('hi mongooose')
    try{
        const conn = await mongoose.connect('mongodb://localhoost:27017/userAuth',{});
        console.log(`mongoDB connected : ${conn.connection.host}`);
    }catch{
        //console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;