import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dislikePost, getSinglePost, likePost, updatePost } from '../../services/post.service';
import './posts.css';
import { AppContext } from '../../../state/app.context';

export const PostDetail = () => {
    const { postId, subcategoryId } = useParams();
    const [post, setPost] = useState(null); // Initially set post to null
    const { userData } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false); // Track if the user is editing
    const [editedContent, setEditedContent] = useState(''); // Hold the edited content

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getSinglePost(subcategoryId, postId);
                setPost({
                    likedBy: data.likedBy ?? {},
                    ...data,
                });
                setEditedContent(data.Content); // Initialize edited content
            } catch (e) {
                console.error('Error fetching post:', e);
            }
        };

        fetchPost();
    }, [subcategoryId, postId]);

    const toggleLike = async () => {
        if (!userData || !post) {
            alert("You need to be logged in to like or dislike a post.");
            return; 
        }

        const isLiked = Object.keys(post.likedBy).includes(userData.uid);

        try {
            if (!isLiked) {
                await likePost(userData.uid, postId, subcategoryId);
                setPost(prevPost => ({
                    ...prevPost,
                    likedBy: {
                        ...prevPost.likedBy,
                        [userData.uid]: true,
                    },
                }));
            } else {
                await dislikePost(userData.uid, postId, subcategoryId);
                const { [userData.uid]: _, ...newLikedBy } = post.likedBy;
                setPost(prevPost => ({
                    ...prevPost,
                    likedBy: newLikedBy,
                }));
            }
        } catch (error) {
            console.error('Error updating like status:', error);
            alert(error.message);
        }
    };

    const handleEdit = () => {
        if (userData && post && userData.uid === post.createdBy.ID) {
            setIsEditing(true);
        }
    };

    const handleSave = async () => {
        try {
            await updatePost(  { Content: editedContent }, subcategoryId, postId);
            setPost(prevPost => ({
                ...prevPost,
                Content: editedContent
            }));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating post:', error);
            alert(error.message);
        }
    };

    if (!post) {
        return <div>Loading...</div>; // Show loading until the post is ready
    }

    return (
        <div id="post-container">
            <div id="post-header">
                <h1 id="post-title">{post.Title}</h1>
            </div>
            <div id="post-separator"></div>
            
            {isEditing ? (
                <div id="post-edit">
                    <textarea 
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div id="post-body">{post.Content}</div>
            )}

            <div id="post-footer-separator"></div>
            <>
                <div>Likes: {Object.keys(post.likedBy).length}</div>
                <button onClick={toggleLike} disabled={!userData}>
                    {userData && Object.keys(post.likedBy).includes(userData.uid) ? 'Dislike' : 'Like'}
                </button>
                {userData && post.createdBy.ID === userData.uid && (
                    <button onClick={handleEdit}>Edit</button>
                )}
            </>
        </div>
    );
};