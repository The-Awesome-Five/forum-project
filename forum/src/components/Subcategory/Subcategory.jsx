import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostsBySubcategoryId } from "../../services/post.service";
import './Subcategory.css';
import { CreatePost } from "../commonComponents/CreateForm/CreateForm";

export const Subcategory = () => {
    const { subcategoryId } = useParams();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc'); // For replies sorting
    const [sortOrderLikes, setSortOrderLikes] = useState('desc'); // For likes sorting

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

    const handleSortByReplies = () => {
        const sortedPosts = [...posts].sort((a, b) => {
            const aReplies = a.Replies ? Object.values(a.Replies).length : 0;
            const bReplies = b.Replies ? Object.values(b.Replies).length : 0;

            if (sortOrder === 'asc') {
                return aReplies - bReplies; 
            } else {
                return bReplies - aReplies; 
            }
        });

        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setPosts(sortedPosts);
    }

    const handleSortByLikes = () => {
        const sortedPosts = [...posts].sort((a, b) => {
            const aLikes = a.likedBy ? Object.values(a.likedBy).length : 0;
            const bLikes = b.likedBy ? Object.values(b.likedBy).length : 0;

            if (sortOrderLikes === 'asc') {
                return aLikes - bLikes; 
            } else {
                return bLikes - aLikes; 
            }
        });

        setSortOrderLikes(sortOrderLikes === 'asc' ? 'desc' : 'asc');
        setPosts(sortedPosts);
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='subcategory'>
            <button onClick={handleCreatePost}>Make a Post</button>

            <h2>Posts in this Subcategory</h2>
             
                <tr className='post-details'>
                    <th className='post-author'>Author</th>
                    <th className='post-comments' onClick={handleSortByReplies}>
                        Replies {sortOrder === 'asc' ? '↑' : '↓'}
                    </th>
                    <th className='post-views' onClick={handleSortByLikes}>
                        Likes {sortOrderLikes === 'asc' ? '↑' : '↓'}
                    </th>
                </tr>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className='post-item'>
                            <Link to={`${post.id}`}>{post.Title}</Link>
                            <div className='post-details'>
                                <span className='post-author'>{post.createdBy.username}</span>
                                <span className='post-comments'>
                                    {post.Replies ? Object.values(post.Replies).length : 0} replies
                                </span>
                                <span className='post-views'>
                                    {post.likedBy ? Object.values(post.likedBy).length : 0} likes
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No posts available in this subcategory.</div>
                )}
            </div>
       
    );
}