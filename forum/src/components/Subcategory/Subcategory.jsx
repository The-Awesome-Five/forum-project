import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {getPostsBySubcategoryId} from "../../services/post.service";


export const Subcategory = () => {
    const { subcategoryId } = useParams();
    const [posts, setPosts] = useState([]);
   
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


    if (error) {
        return <div>{error}</div>; 
    }

    return (
        <div className='subcategory'>
            <h2>Posts in this Subcategory</h2>
            <div className='post-list'>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className='post-item'>
                            <Link to={`/post/${post.id}`}>{post.Title}</Link>
                        </div>
                    ))
                ) : (
                    <div>No posts available in this subcategory.</div>  
                )}
            </div>
        </div>
    );
}