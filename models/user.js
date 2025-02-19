const {Schema , model} = require("mongoose");

const userSchema = new Schema({
    fullName : {
        type : String , 
        required : true
    },
    email : {
        type : String , 
        required : true , 
        unique : true
    },
    password : {
        type : String , 
        required : true
    } , 
    profileImg : {
        type : String , 
        default : "/public/img/avatar.png"
    },
    role : {
        type : String , 
        enum : ["USER", "ADMIN"],
        default : "USER"
    }
},{timestamps : true})

const userModel = model("users", userSchema);

module.exports = {userModel};