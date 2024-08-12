import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostsBySubcategoryId } from "../../services/post.service";
import './Subcategory.css';
import { CreatePost } from "../commonComponents/CreateForm/CreateForm";

export const Subcategory = () => {
    const { subcategoryId } = useParams();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [filterKeyword, setFilterKeyword] = useState(''); 
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortOrderLikes, setSortOrderLikes] = useState('desc');

    useEffect(() => {
        getPostsBySubcategoryId(subcategoryId)
            .then(data => {
                if (data === null || Object.keys(data).length === 0) {
                    setPosts([]);
                    setFilteredPosts([]);
                } else {
                    const postList = Object.values(data);
                    setPosts(postList);
                    setFilteredPosts(postList); 
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
        const sortedPosts = [...filteredPosts].sort((a, b) => {
            const aReplies = a.Replies ? Object.values(a.Replies).length : 0;
            const bReplies = b.Replies ? Object.values(b.Replies).length : 0;

            return sortOrder === 'asc' ? aReplies - bReplies : bReplies - aReplies;
        });

        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setFilteredPosts(sortedPosts);
    }

    const handleSortByLikes = () => {
        const sortedPosts = [...filteredPosts].sort((a, b) => {
            const aLikes = a.likedBy ? Object.values(a.likedBy).length : 0;
            const bLikes = b.likedBy ? Object.values(b.likedBy).length : 0;

            return sortOrderLikes === 'asc' ? aLikes - bLikes : bLikes - aLikes;
        });

        setSortOrderLikes(sortOrderLikes === 'asc' ? 'desc' : 'asc');
        setFilteredPosts(sortedPosts);
    }

    const handleFilterChange = (event) => {
        const keyword = event.target.value.toLowerCase();
        setFilterKeyword(keyword);

        if (keyword.trim() === '') {
            setFilteredPosts(posts); 
        } else {
            const filtered = posts.filter(post => 
                post.Title.toLowerCase().includes(keyword) ||
                post.Content.toLowerCase().includes(keyword)
            );
            setFilteredPosts(filtered);
        }
    }
    return (
        <div className='subcategory'>
            <button onClick={handleCreatePost}>Make a Post</button>

            <h2>Posts in this Subcategory</h2>
             
            <input
                type="text"
                placeholder="Filter by keyword..."
                value={filterKeyword}
                onChange={handleFilterChange}
                className="filter-input"
            />
                <tr className='post-details'>
                    <th className='post-author'>Author</th>
                    <th className='post-comments' onClick={handleSortByReplies}>
                        Replies {sortOrder === 'asc' ? '↑' : '↓'}
                    </th>
                    <th className='post-views' onClick={handleSortByLikes}>
                        Likes {sortOrderLikes === 'asc' ? '↑' : '↓'}
                    </th>
                </tr>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
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