
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSinglePost } from '../../services/post.service';
import './posts.css'

const PostDetail = () => {
    const { postId } = useParams();
    const { subcategoryId } = useParams();
    const [post, setPost] = useState({});
    const [replies, setReplies] = useState([]);

    useEffect(() => {
      
        getSinglePost(subcategoryId, postId)
            .then(data => {
                console.log(data);
                
                    setPost(data); 
           
              
            })
            .catch(e => {
                console.error('Error fetching posts:', e);
              
            });
    }, [subcategoryId, postId]);

    return (
<div id="post-container">
    <div id="post-header">
        <h1 id="post-title">{post.Title}</h1>
    </div>
    
    <div id="post-separator"></div>
    
    <div id="post-body">{post.Content}</div>
    <div id="post-footer-separator"></div> 
</div>
    );
};

export default PostDetail;