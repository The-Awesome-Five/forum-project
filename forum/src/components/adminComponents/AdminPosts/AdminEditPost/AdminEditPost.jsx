import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {updatePost} from "../../../../services/post.service.js";
import './AdminEditPost.css';

export const AdminEditPost = ({  }) => {
    const [post, setPost] = useState({})

    const location = useLocation();
    let postToBeEdited;

    if (location.state && location.state.postToBeEdited) {
        postToBeEdited = location.state.postToBeEdited;
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (postToBeEdited) {
            setPost(postToBeEdited);
        }
    }, []);

    const editPost = (prop) => (e) => {

        setPost((prevPost) => ({

            ...prevPost,
            [prop]: e.target.value,
        }));
    };

    const submitHandler = async () => {

        const {Title, Content, imgUrl} = post;

        if (!Title || !Content) {
            return alert('Please fill all of the needed fields');
        }
        if (Title.length < 16 || 64 < Title.length) {
            return alert('Name should be between 8 and 32 symbols');
        }
        if (Content.length < 32 || 8192 < Content.length) {
            return alert('Description needs to be between 16 and 64 symbols');
        }

        try {

            await updatePost(post, post.subcategoryId, post.id);

            navigate('/post-management');

        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className="edit-post-form">
            <div className="form-group">
                <label>Title:</label>
                <input type="text" value={post.Title} onChange={editPost('Title')}/>
            </div>
            <div className="form-group">
                <label>Content:</label>
                <textarea type="text" value={post.Content} onChange={editPost('Content')}/>
            </div>
            <button className="edit-post-button" onClick={submitHandler}>Edit Post</button>
        </div>
    )
}
