const adminModel = require('../model/adminModel');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel')

const loadLogin = async (req, res) => {
    res.render('admin/login')
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await adminModel.findOne({ username });

        if (!admin) {

            return res.render('admin/login', { message: 'Invalid credentials' });

        }

        const isMatch = await bcrypt.compare(password, admin.password);
        console.log(isMatch, password, admin.password)

        if (!isMatch) return res.render('admin/login', { message: 'Incorrect password' });
        req.session.admin = true;
        req.session.adminMessage = 'success'
        res.redirect('/admin/dashboard')


    } catch (error) {
        res.send(error)
    }
}

const LoadDashboard = async (req, res) => {
    try {
        const admin = req.session.admin;


        if (!admin) return res.redirect('/admin/login');

        const users = await userModel.find({})
        console.log(users)
        let message = 'Login successful'
        res.render('admin/dashboard', { users, adminMessage: req.session.adminMessage, message });
        if (req.session.adminMessage) {
            message = ' '
            req.session.adminMessage = null
        }



    } catch (error) {
        res.render('admin/login', { message: 'Something went wrong' })
    }
}

const editUser = async (req, res) => {
    try {

        const { username, password, id } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)

        // const user = await userModel.findOneAndUpdate({_id:id},{username},{password});
        const user = await userModel.findOneAndUpdate({ _id: id }, { $set: { username, password: hashedPassword } });

        res.redirect('/admin/dashboard')


    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findOneAndDelete({ _id: id });

        res.redirect('/admin/dashboard')


    } catch (error) {
        console.log(error)
    }
}

const addUser = async (req, res) => {
    try {

        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            username,
            password: hashedPassword
        })

        await newUser.save()
        res.redirect('/admin/dashboard');


    } catch (error) {
        console.log(error)
    }
}

const logout = async (req, res) => {
    req.session.admin = null;
    res.redirect('/admin/login')
}

const searching = async (req, res) => {
    try {
        const { searchVal } = req.body;
        console.log(searchVal)
        
        const expr = new RegExp(`^${searchVal}`,"i");

        const searchedUser = await userModel.find({username:expr})

        res.json({
            searchedUser
        })
        console.log(searchedUser)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    loadLogin,
    login,
    LoadDashboard,
    editUser,
    deleteUser,
    addUser,
    logout,
    searching
}