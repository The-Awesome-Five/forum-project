import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dislikePost, getSinglePost, likePost } from '../../services/post.service';
import './posts.css';
import { AppContext } from '../../../state/app.context';

export const PostDetail = () => {
    const { postId, subcategoryId } = useParams();
    const [post, setPost] = useState(null); // Initially set post to null
    const { userData } = useContext(AppContext);

    useEffect(() => {
        if (!userData) return; // Wait until userData is available

        const fetchPost = async () => {
            try {
                const data = await getSinglePost(subcategoryId, postId);
                setPost({
                    likedBy: data.likedBy ?? {},
                    ...data,
                });
            } catch (e) {
                console.error('Error fetching post:', e);
            }
        };

        fetchPost();
    }, [subcategoryId, postId, userData]);

    const toggleLike = async () => {
        if (!userData || !post) return; // Ensure userData and post are available

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

    if (!userData || post === null) {
        return <div>Loading...</div>; // Show loading until post and userData are ready
    }

    return (
        <div id="post-container">
            <div id="post-header">
                <h1 id="post-title">{post.Title}</h1>
            </div>
            <div id="post-separator"></div>
            <div id="post-body">{post.Content}</div>
            <div id="post-footer-separator"></div>
            <>
                <div>Likes: {Object.keys(post.likedBy).length}</div>
                <button onClick={toggleLike}>
                    {Object.keys(post.likedBy).includes(userData.uid) ? 'Dislike' : 'Like'}
                </button>
            </>
        </div>
    );
};
