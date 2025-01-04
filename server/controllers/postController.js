const Post = require("../models/Post")

const createNewPost = async (req, res) => {
    const { title, body } = req.body
    if (!title)
        return res.status(400).json({ message: 'title is required' })
    const post = await Post.create({ title, body })
    if (!post)
        return res.status(400).send('invalid post')
    res.json(await Post.find().lean())
}

const getAllPosts = async (req, res) => {
   const posts=await Post.find().lean()
   if (!posts)
    return res.status(400).send('posts no found')
res.json(posts)
}

const getPostById = async (req, res) => {
    const {id}=req.params
    const post=await Post.findById(id).lean()
    if (!post)
     return res.status(400).send('posts no found')
 res.json(post)
 }

 const updatePost = async (req, res) => {
    const {_id, title, body } = req.body
    if (!title||!_id)
        return res.status(400).json({ message: 'title and id is required' })
    const post = await Post.findById(_id).exec()
    if (!post)
        return res.status(400).send('post no found')
post.title=title
post.body=body
const updatepost=await post.save()
    res.json(await Post.find().lean() )
}

const deletePost = async (req, res) => {
    const {id } = req.params
    if (!id)
        return res.status(400).json({ message: 'id is required' })
    const post = await Post.findById(id).exec()
    if (!post)
        return res.status(400).send('post no found')

const del=await post.deleteOne()
        res.json(await Post.find().lean())
}

const getPostBytitle=async (req,res)=>{
    
    const {title}=req.params
     const post=await Post.find({title:{$regex:title}}).lean()
     console.log(post);
     if(!post){
         res.json([])
 
     }
     res.json(post)
 }
module.exports = { createNewPost,getAllPosts,getPostById,updatePost,deletePost,getPostBytitle }