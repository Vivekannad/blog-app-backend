const {Schema , model} = require("mongoose");

const commentSchema = new Schema({
    content: {
        type : String , 
        required : true
    },
    blog : {
        type : Schema.Types.ObjectId,
        ref : "blog"
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "users"
    }
},{timestamps : true});

const commentModel = model("comments", commentSchema);

module.exports = commentModel;