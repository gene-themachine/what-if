const axios = require('axios');
const commentRouter = require('express').Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');


commentRouter.post('/', async (req, res) => {
    try {
        const { content, postId } = req.body;
        const rightPost = await Post.findById(postId);
        const comment = new Comment({
            content: content.content,
            post: rightPost._id
        }); 
        rightPost.comments = rightPost.comments.concat(comment._id);
        const savedComment = await comment.save();
        await rightPost.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

commentRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Comment.find({ post: id });
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});


module.exports = commentRouter;