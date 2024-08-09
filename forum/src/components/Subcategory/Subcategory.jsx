import {useEffect, useState} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import {getPostsBySubcategoryId} from "../../services/post.service";
import './Subcategory.css'
import { CreatePost } from "../commonComponents/CreateForm/CreateForm";

export const Subcategory = () => {
    const { subcategoryId } = useParams();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null); 

    useEffect(() => {
      
        getPostsBySubcategoryId(subcategoryId)
            .then(data => {
                if (data === null || Object.keys(data).length === 0) {
                    setPosts([]); 
                } else {
                    setPosts(Object.values(data));
                }
              
            })
            .catch(e => {
                console.error('Error fetching posts:', e);
                setError('An error occurred while fetching posts.'); 
              
            });
    }, [subcategoryId]);
    const handleCreatePost = () => {
        navigate(`/create-post/${subcategoryId}`);
      };

    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div className='subcategory'>
            <button onClick={handleCreatePost}>Make a Post</button>

            <h2>Posts in this Subcategory</h2>
            <div className='post-list'>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className='post-item'>
                            <Link to={`${post.id}`}>{post.Title}</Link>
                            <div className='post-details'>
                                <span className='post-author'>{post.createdBy.username}</span>
                                <span className='post-comments'>{post.Replies ? post.Replies : 0} replies</span>
                                <span className='post-views'>{post.Likes ? post.Likes : 0} likes</span>
                               
                </div>
                        </div>
                    ))
                ) : (
                    <div>No posts available in this subcategory.</div>  
                )}
            </div>
        </div>
    );
}