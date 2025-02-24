const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const send_mail = require('../email_verify');

exports.register = async function(req,res){
    const username = _.capitalize(req.body.username)
    const email = req.body.email
    const password = await bcrypt.hash(req.body.password,10)
    const found_username = await User.findOne({username:username})
    const found_email = await User.findOne({email:email})
    if (found_username){
        return res.render('register',{found_username:true,found_email:false})
    }
    if (found_email){
        return res.render('register',{found_username:false,found_email:true})
    }
    const user = new User({
        username:username,
        email:email,
        password:password
    })
    await user.save()
    const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'24h'})
    const link = `http://localhost:3000/auth/confirm-email/${token}`
    await send_mail(link,username,email,'register')
    res.render('email-confirmation',{username:username,email:email})
}

exports.login = async function(req,res){
    const email = req.body.email
    const password = req.body.password
    const found = await User.findOne({email:email,verified:true})
    if(found){
        const isMatch = await bcrypt.compare(password,found.password)
        console.log(password)
        if(isMatch){
            const token = jwt.sign({ username:found.username,id:found._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
            res.cookie('token',token,{
                httpOnly: true,
                secure: process.env.NODE_ENV==='production',
                maxAge: 7*24*60*60*1000
            })
            res.redirect('/')}
        else{
            return res.render('login',{email:true,password:false})
        }
    }
    else{
        return res.render('login',{email:false,password:''})
    }
}

exports.reset_password = async function(req,res){
    const email = req.body.email
    const user = await User.findOne({email:email})
    if(user){
        const username = user.username
        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'24h'})
        const link = `http://localhost:3000/auth/reset_password/${token}`
        try {
            await send_mail(link, username, email, 'reset');
            console.log("Email successfully sent to:", email);
        } catch (error) {
            console.error("Error while sending email:", error);
        }
        return res.render('reset-confirmation')
    }
    else{
        return res.render('reset_password',{exist:false});
    }
}


exports.provide_password = async function(req,res){
    const newpassword = await bcrypt.hash(req.body.newpassword,10)
    const decoded = jwt.verify(req.body.token,process.env.JWT_SECRET)
    const user = await User.findOneAndUpdate({email:decoded.email},{password:newpassword})
    await user.save()
    res.render('reset_success')
}