const mongoose = require('mongoose');
const {userSchema} = require('../models/user')
const {commentSchema} = require('../models/comment')
 
const blogSchema = new mongoose.Schema({
    author: {
        type: userSchema
    },
    title: String,
    content: String,
    image: {
        type:String,
        default:null,
    },
    created_at: {
        type:Date,
        default:Date.now,
    },
    comment: {
        type:[{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
        default: []
    },
    view_user:{
        type:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: []
    },
    like_user:{
        type:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: []
    },
});
module.exports = mongoose.model('Blog',blogSchema);