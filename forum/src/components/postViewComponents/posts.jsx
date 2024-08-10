
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dislikePost, getSinglePost, likePost } from '../../services/post.service';
import './posts.css'
import { AppContext  } from '../../../state/app.context';
export const PostDetail = () => {
    const { postId } = useParams();
    const { subcategoryId } = useParams();
    const [post, setPost] = useState({});
    const [replies, setReplies] = useState([]);
    const {userData} = useContext(AppContext)
    useEffect(() => {
        
        getSinglePost(subcategoryId, postId)
            .then(data => {
                
                console.log(userData.uid)
                    setPost({
                        likedBy: data.likedBy ?? {},
                        ...data}); 
           
              
            })
            .catch(e => {
                console.error('Error fetching posts:', e);
              
            });
    }, [subcategoryId, postId]);

    const toggleLike = async () => {
        console.log('triggered');
        const isLiked = Object.keys(post.likedBy).includes(userData.uid);
        console.log(isLiked);
        try {
          if (!isLiked) {
            console.log('liking')
            await likePost(userData.uid, postId, subcategoryId);
            setPost(prevPost => ({
                ...prevPost,
                likedBy: {
                    ...prevPost.likedBy,
                    [userData.uid]: true
                }
            }));
          } else {
            console.log('disliking')
            await dislikePost(userData.uid, postId, subcategoryId);
            const { [userData.uid]: _, ...newLikedBy } = post.likedBy;
            setPost(prevPost => ({
                ...prevPost,
                likedBy: newLikedBy
            }));
          }
        } catch (error) {
          alert(error.message);
        }
      };

    return (
<div id="post-container">
    {console.log(post)}
    <div id="post-header">
        <h1 id="post-title">{post.Title}</h1>
    </div>
    
    <div id="post-separator"></div>
    
    <div id="post-body">{post.Content}</div>
    <div id="post-footer-separator"></div>
    {post && post.likedBy && (<>
    <div> Likes: {Object.keys(post.likedBy) ? Object.keys(post.likedBy).length : 0} </div>
    <button onClick={toggleLike}>
        {Object.keys(post.likedBy).includes(userData.uid) ? 'Dislike' : 'Like'}
    </button>
    </>
)} 
</div>
    );
};

