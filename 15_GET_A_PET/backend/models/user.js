const { Schema } = require('mongoose');
const mongoose = require('../db/conn');

const User = mongoose.model(
    'User',
    new Schema({
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        img:{
            type: String
        },
        phone:{
            type: String,
            required: true
        },
    },
        {timestamps:true}
    )
);

module.exports = User;