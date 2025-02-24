const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const verify_user = require('../config/auth');
const { compose } = require('../controllers/composeController')
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join('public','image'),
    filename: (req,file,cb) =>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({storage})

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/compose',verify_user,function(req,res){
    res.render('compose_blog',{user:req.user.username,id:req.user.id})
})

router.post('/compose',upload.single("image"),compose)

module.exports = router
