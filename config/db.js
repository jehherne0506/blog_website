const mongoose = require('mongoose');

const connect_db = async function(){
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/blog_website');
        console.log('Database is Connected')
    } catch(err){
        console.log(err);
        process.exit(1)
    }
}

module.exports = connect_db