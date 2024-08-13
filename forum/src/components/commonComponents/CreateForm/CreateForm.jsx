import { useContext, useState } from "react";
import { AppContext } from "../../../state/app.context";
import { useNavigate, useParams } from "react-router-dom";
import { createPost } from "../../../services/post.service";
import './CreateFrom.css'

export const CreatePost = () => {
    const { userData } = useContext(AppContext);
    const { subcategoryId } = useParams();

    const [post, setPost] = useState({
        createdBy: {
            username: '',
            ID: ''
        },
        Title: '',
        Content: '',
        CreatedOn: '',
        isHidden: false,
        isLocked: false,
        likedBy: {
            temp: null,
        },
    });

    const navigate = useNavigate();

    const updatePost = (prop) => (e) => {
        setPost((prevPost) => ({
            ...prevPost,
            [prop]: e.target.value,
        }));
    };

    const create = async () => {
        const { Title, Content } = post;
        if (!Title || !Content) {
            return alert('Please fill all of the needed fields');
        }
        if (Title.length < 16 || 64 < Title.length) {
            return alert('Title should be between 16 and 64 symbols');
        }
        if (Content.length < 32 || 8192 < Content.length) {
            return alert('Content needs to be between 32 and 8192 symbols');
        }

        try {
            post.CreatedOn = new Date().toString();
            post.createdBy.ID = userData.uid;
            post.createdBy.username = userData.username;
            const postID = await createPost(post, subcategoryId);

            navigate('/');
        } catch (e) {
            
        }
    };

    return (
        <div className="create-post-container">
            <h2>Create A Post</h2>
            <input
                type="text"
                className="post-title-input"
                placeholder="Title"
                value={post.Title}
                onChange={updatePost('Title')}
            />
            <br />
            <textarea
                className="post-content-textarea"
                placeholder="Content"
                value={post.Content}
                onChange={updatePost('Content')}
                rows="10"
            />
            <br />
            <button className="submit-post-button" onClick={create}>
                Post
            </button>
        </div>
    );
};

export default CreatePost;