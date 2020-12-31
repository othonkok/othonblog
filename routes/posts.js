const express = require('express')
const Post = require('../models/Post')
const router = express.Router()

//Get All Posts
router.get('/', async(req, res) => {
    try{
    const posts = await Post.find()
    res.render('getAllPosts', { posts: posts })
    }catch(err){
        res.json({ message: err })
    }
})

//Create New Post Form
router.get('/new', (req, res) => {
    res.render('createPost', {post: new Post()})
})
//Create New Post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    const savedPost = await post.save()
    return res.redirect('/posts')
})

//Get One Post
router.get('/:id', async(req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('getOnePost', { post: post })
})

//Update Post Form
router.get('/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('editPost', { post: post })
})

//Delete Post
router.delete('/:id', async (req, res) => {
    const removedPost = await Post.findByIdAndDelete({ _id: req.params.id })
    res.redirect('/posts')
})

//Update Post
router.put('/:id', async(req, res) => {
    let post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body)
    res.redirect('/posts')
})

module.exports = router