const {Schema , model} = require("mongoose");

const blogSchema = new Schema({
    title : {
        type : String , 
        required : true
    },
    body : {
        type : String , 
        required : true
    },
    coverImg : {
        type : String , 
        required : false
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "users"
    }
}, {timestamps : true});

const blogModel = model("blog", blogSchema);

module.exports = {
    blogModel
}