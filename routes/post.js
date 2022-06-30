const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Post = require('../models/Post')

//@route GET api/posts
//@desc get post
//access: private
router.get('/', verifyToken, async(req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
        res.json({ success: true, posts })
    } catch (error) {

    }
})

//@route POST api/posts
//@desc Create post
//access: private

router.post('/', verifyToken, async(req, res) => {
    const { title, description, url, status } = req.body
        // simple validation

    if (!title)
        return res.status(400).json({ success: false, message: "title is required" })

    try {
        const newPost = new Post({
            title,
            description,
            url: (url.startsWith('https://')) ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        })

        await newPost.save()

        res.json({ success: true, message: 'Happy learning!', post: newPost })


    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
})

//@route PUT api/posts
//@desc Update post
//access: private 
router.put('/:id', verifyToken, async(req, res) => {
    const { title, description, url, status } = req.body

    if (!title)
        return res.status(400).json({ success: false, message: "title is required" })

    try {
        let updatedPost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
        }
        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true })
            // user not authorized to update post
        if (!updatedPost)
            return res.status(401).json({ success: false, message: 'Post not found or not authorized' })

        res.json({ success: true, message: "Gud", post: updatedPost })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
})

//@route DELETE api/posts
//@desc Delete post
//access: private 

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedPost = await Post.findByIdAndDelete(postDeleteCondition)

        // user not authorized
        if (!deletedPost)
            return res.status(401).json({ success: false, message: 'Post not found or not authorized' })

        res.json({ success: true, message: "Deleted", post: deletedPost })
    } catch (error) {

    }
})



module.exports = router