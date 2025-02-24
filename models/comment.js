const mongoose = require('mongoose');
const { userSchema } = require('../models/user')

const commentSchema = new mongoose.Schema({
    user: {
        type: userSchema
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,ref:'Blog'
    },
    text: String,
    created_at: {
        type:Date,
        default:Date.now,
    }
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = {Comment,commentSchema}