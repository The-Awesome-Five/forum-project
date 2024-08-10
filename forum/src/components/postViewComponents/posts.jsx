
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dislikePost, getSinglePost, likePost } from '../../services/post.service';
import './posts.css'
import { AppContext  } from '../../../state/app.context';
const PostDetail = () => {
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
                        likedBy: Object.keys(data.likedBy ?? {}),
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
          } else {
            console.log('disliking')
            await dislikePost(userData.uid, postId, subcategoryId);
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
    {post && post.likedBy && (
    <button onClick={toggleLike}>
        {Object.keys(post.likedBy).includes(userData.uid) ? 'Dislike' : 'Like'}
    </button>
)} 
</div>
    );
};

export default PostDetail;