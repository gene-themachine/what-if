const Post = require('../models/Post');
const postRouter = require('express').Router();


postRouter.get('/all', async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

postRouter.post('/create', async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const post = new Post({ 
            title, 
            content, 
            image,
            comments: []
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

postRouter.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = postRouter;





