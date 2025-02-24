const jwt = require('jsonwebtoken');
const express = require('express');
const { register, login, reset_password, provide_password } = require('../controllers/authController');
const { User } = require('../models/user')
const router = express.Router();


router.get('/register',function(req,res){
    res.render('register',{found_username:false,found_email:false})
})

router.post('/register',register)

router.get('/login',function(req,res){
    res.render('login',{email:'',password:''})
})

router.post('/login',login)

router.get('/reset_password',function(req,res){
    res.render('reset_password',{exist:true});
})

router.post('/reset_password',reset_password)

router.get('/reset_password/:token',function(req,res){
    res.render('reset_password_2',{token:req.params.token});
})

router.get('/confirm-email/:token',async(req,res)=>{
    const token = req.params.token
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findOneAndUpdate({email:decoded.email},{verified:true})
    res.render('register-success',{email:user.email})
})

router.post('/provide_password',provide_password)

module.exports = router