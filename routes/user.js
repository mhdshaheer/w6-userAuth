const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');


route.get('/login',userController.loadLogin);
route.get('/register',userController.loadRegister);
route.post('/register',userController.registerUser)

module.exports = route;
