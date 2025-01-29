import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import postController from '../controllers/posts';
import commentController from '../controllers/comment';

const PostView = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await postController.getPost(id);
                setPost(response);
                const commentsResponse = await commentController.getCommentsByPostId(id);
                setComments(commentsResponse);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim()) {
            try {
                const newComment = await commentController.createComment(id, { content: comment });
                setComments(comments.concat(newComment));
                setComment('');
            } catch (error) {
                console.error('Error creating comment:', error);
            }
        }
    };
    
    return (
        <div className="post-view-container">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="inside-post-view">
                    <div className="inside-post-image-container">
                        <h1 className="inside-post-title">{post.title}</h1>
                        <img className="inside-post-image" src={post.image} alt="Post" />
                    </div>

                    <div className="inside-post-content">
                        <p className="inside-post-description">{post.content}</p>
                    </div>
                </div>
            )}
            <div className="comment-section">
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <textarea className="comment-textarea"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Add a comment..."
                        rows="3"
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div className="comments-list">
                {comments.map((c) => (
                    <div key={c._id} className="comment">
                        <p>{c.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostView;