const Blog = require('../models/blog');
const { User } = require('../models/user')

exports.compose = async function(req,res){
    const blog = Blog({
        author: await User.findOne({'_id':req.body.user,}),
        title: req.body.title,
        content: req.body.content,
        image: req.file.filename
    })
    console.log(req.file); 
    console.log(req.body);
    await blog.save()
    const user = await User.findOne({_id:req.body.user})
    user.blog_publish.push(blog._id)
    await user.save()
    res.render('compose_success',{})
}