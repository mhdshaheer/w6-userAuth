const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');


route.get('/login',userController.loadLogin);
route.post('/login',userController.login);
route.get('/register',userController.loadRegister);
route.post('/register',userController.registerUser);
route.get('home',userController.loadHome);

module.exports = route;
