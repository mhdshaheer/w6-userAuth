const express = require('express');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required :true,
    },
    password : {
        type : String,
        required :true,
    },
});

module.exports = mongoose.model('user',userSchema);