const Blog = require('../models/blog')
const { Comment } = require('../models/comment')
const { User } = require('../models/user')

exports.get_Blog = async function(req,res){
    const user = req.user.username
    const viewer_id = req.user.id
    const blog_id = req.params.id
    const blog = await Blog.findOne({_id:blog_id}).populate({path:'comment',populate:{path:'user'}})
    console.log(blog)
    if(!(blog.view_user.includes(viewer_id))){
        blog.view_user.push(viewer_id)
        await blog.save()
    }
    res.render('blog_view',{blog:blog,user:user})
}

exports.like_Blog = async function(req,res){
    const viewer_id = req.user.id
    blog_id = req.params.id
    const blog = await Blog.findOne({_id:blog_id})
    if(!(blog.like_user.includes(viewer_id))){
        blog.like_user.push(viewer_id)
        await blog.save()
        res.json({liked:true,liked_count:blog.like_user.length})
    }
    else{
        const index = blog.like_user.indexOf(viewer_id)
        blog.like_user.splice(index,1)
        await blog.save()
        res.json({liked:false,liked_count:blog.like_user.length})
    }
}

exports.check_like_Blog = async function(req,res){
    const viewer_id = req.user.id
    blog_id = req.params.id
    const blog = await Blog.findOne({_id:blog_id})
    if(blog.like_user.includes(viewer_id)){
        res.json({liked:true})
    }
    else{
        res.json({liked:false})
    }
}

exports.add_comment = async function(req,res){
    const user_id = req.user.id
    const user = await User.findOne({_id:user_id})
    const blog_id = req.body.blog_id
    const comment = req.body.comment
    console.log(user)
    const new_comment = Comment({
        user:user,
        blog:blog_id,
        text:comment
    })
    await new_comment.save()
    const blog = await Blog.findOne({_id:blog_id})
    console.log(blog_id)
    console.log(blog)
    blog.comment.push(new_comment._id)
    await blog.save()
    res.redirect('/blog/view/'+blog_id)
}
