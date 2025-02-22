const jwt = require("jsonwebtoken");
require("dotenv").config();

function createToken(user){
    const payload = {
        id: user._id,
        email : user.email , 
        profileImg : user.profileImg,
        role : user.role,
        fullName : user.fullName
    }
    return jwt.sign(payload, process.env.SECRET_KEY);
}

function validateToken(token){
   return jwt.verify(token , process.env.SECRET_KEY)
}

module.exports = {
    createToken , 
    validateToken
}