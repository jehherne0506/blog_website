const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    role: String,
    password: String,
    verified: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type:Date,
        default:Date.now(),
    },
    blog_publish : [{type:mongoose.Schema.Types.ObjectId,ref:'Blog'}]
});
const User = mongoose.model('User',userSchema);
module.exports = {User,userSchema}