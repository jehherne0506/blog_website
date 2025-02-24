require('dotenv').config();
const mongoose = require('mongoose');

const connect_db = async function(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database is Connected')
    } catch(err){
        console.log(err);
        process.exit(1)
    }
}

module.exports = connect_db