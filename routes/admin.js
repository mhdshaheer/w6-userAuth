const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController')

router.get('/login',adminController.loadLogin);
router.post('/login',adminController.login)
router.get('/dashboard',adminController.LoadDashboard)

module.exports = router;