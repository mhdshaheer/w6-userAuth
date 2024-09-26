const express =require("express");
const app = express();

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin')

app.use('/user',userRoutes);
app.use('/admin',adminRoutes);

app.listen(3000,()=>{
    console.log("server is running on : http://localhost:3000/");
})