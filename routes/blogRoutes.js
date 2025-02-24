const express = require('express')
const router = express.Router()
const verify_user = require('../config/auth');
const { get_Blog,like_Blog,check_like_Blog,add_comment } = require('../controllers/blogController')

router.get('/:id',verify_user,get_Blog)
router.post('/:id',verify_user,add_comment)
router.post('/like/:id',verify_user,like_Blog)
router.post('/like/check/:id',verify_user,check_like_Blog)

module.exports = router