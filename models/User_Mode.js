const mongoose = require('mongoose');

const user_schema = new mongoose.Schema(
    {
        full_name : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
        },
        password : {
            type : String,
            required : true,
        },
        mobile_no : {
            type : Number,
            required : true,
        },
        gender : {
            type : String,
            required : true,
        },
        age : {
            type : Number,
            required : true,
        },
        dob : {
            type : String,
            required : true,
        },
        Files : {
            type : Array,
        },
    }
);

const User  = mongoose.model("User_data" , user_schema);
module.exports = User;
