require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connect_db = require('./config/db')
const verify_user = require('./config/auth')
const { User } = require('./models/user')
const Blog = require('./models/blog')
const { Comment } = require('./models/comment')
const authRoutes = require('./routes/authRoutes');
const composeRoutes = require('./routes/composeRoutes');
const blog_view = require('./routes/blogRoutes');
const path = require('path')

const app = express();

connect_db()

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/auth',authRoutes)
app.use('/blog',composeRoutes)
app.use('/blog/view/',blog_view)


app.get('/',verify_user,async function(req,res){
    let all;
    console.log(req.user)
    console.log(req.user.username)
    all_blogs = await Blog.find()
    sort_blogs = await Blog.find().sort({view_user:-1})
    if(all_blogs.length<3){
        all = true
    }
    else{
        all = false
    }
    res.render('index',{user:req.user.username,sort_blogs:sort_blogs,all_blogs:all_blogs,all:all})
})

app.listen(3000, () => {
    console.log(`Listening on port 3000`)
})