const mongoose = require("mongoose");
 require("dotenv").config();


 async function connection(){
    try{
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('Connected');
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports = connection