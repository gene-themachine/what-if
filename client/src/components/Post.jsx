import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const Post = (props) => {


    return (
        <div id = "post-container">
            <div id = "post-text-container">    
                <h3 id = "posts-title">{props.post.title}</h3>
            </div>
            
            <div id = "post-image-container">
                <img id = "post-image" src = {props.post.image} alt = {`${props.post.image}`} />
            </div>

            <div className="post-icons">
                <div className="icon">
                    <FontAwesomeIcon icon={faComment} />
                    <span className = "icon-text">{props.post.comments.length}</span>
                </div>
               
            </div>
        </div>
    )
}

export default Post