const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth')


route.get('/login',auth.isLogin,userController.loadLogin);
route.post('/login',userController.login);
route.get('/register',auth.isLogin,userController.loadRegister);
route.post('/register',userController.registerUser);
route.get('home',auth.checkSession,userController.loadHome);

module.exports = route;
