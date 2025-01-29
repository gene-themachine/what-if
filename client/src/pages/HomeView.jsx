import Post from '../components/Post'
import { useState, useEffect } from 'react';
import postController from '../controllers/posts';
import { useNavigate } from 'react-router-dom';
import pictureController from '../controllers/picture';



const HomeView = () => {
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [inputText, setInputText] = useState('What if...');
    const [contentText, setContentText] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await postController.getAllPosts();
                setPosts(response);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    const handleAddReviewClick = () => {
        setOverlayVisible(!isOverlayVisible);
    }
    const handleCancelReviewClick = () => {
        setInputText('What if...');
        setContentText('');
        setOverlayVisible(!isOverlayVisible);
    }

    const handleTitleChange = (e) => {
        const newValue = e.target.value;
        if (newValue.startsWith('What if')) {
            setInputText(newValue);
        } 

    }

    const handleContentChange = (e) => {
        const newValue = e.target.value;
        setContentText(newValue);

    }

    const fetchPhoto = async (title) => {
        try {
            const response = await pictureController.searchPicture(title);
            return response;
        } catch (error) {
            console.error('Error fetching photo:', error);
            return null;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const photo = await fetchPhoto(inputText.replace(/^What if\s*/, ''));


            if (photo) {
                const post = {
                    title: inputText,
                    content: contentText,
                    image: photo.urls.small
                }
                try {   
                    const newPost = await postController.createPost(post);
                    setPosts(posts.concat(newPost));
                } catch (error) {
                    console.error('Error creating post:', error);
                }
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }

        setOverlayVisible(false); 
        setInputText('What if...'); 
        setContentText('');
    }


    return (
        <div id="scroll-view">
            <div id="home-view">
                <div className="home-posts-container">
                    <div className="content-section">
                        <h1 id="home-posts-title1">Posts</h1>
                        <div className="posts-view">
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                posts.map((post) => (
                                    <div onClick={() => navigate(`/post/${post.id}`)} key={post.id}>
                                        <Post post={post} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div 
                id="addReviewButton"
                className="add-review-button"
                onClick={handleAddReviewClick}
            >
                +
            </div>

            {isOverlayVisible && (
                <div className="overlay">
                    <div className="modal">
                        <button className="close-button" onClick={handleCancelReviewClick}>
                            X
                        </button>
                        <h1>Post</h1>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <textarea
                                className="review-textarea"
                                placeholder="What if"
                                value={inputText}
                                onChange={handleTitleChange}
                            />
                            <textarea
                                className="review-textarea"
                                placeholder="Type context here..."
                                value={contentText}
                                onChange={handleContentChange}
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomeView