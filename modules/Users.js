const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({


    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required:true
    },
    username :{
        type:String,
        required: true,
        unique: true,
        minlength: 3
    },
     password: {
         type:String,
         required:true,
         minlength:3
     },
  

}, {timestamps: true});
module.exports = mongoose.model('Users', userSchema);