import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../../services/post.service.js';
import './Top.css'
export const TopPosts = () => {
    const [topLikedPosts, setTopLikedPosts] = useState([]);
    const [topRepliedPosts, setTopRepliedPosts] = useState([]);

    useEffect(() => {
        getAllPosts()
            .then((postsObject) => {
                const allPostsArray = Object.values(postsObject);
                const sortedByLikes = [...allPostsArray].sort((a, b) => {
                    const likesA = Object.keys(a.likedBy || {}).length;
                    const likesB = Object.keys(b.likedBy || {}).length;
                    return likesB - likesA;
                });
                const top10LikedPosts = sortedByLikes.slice(0, 10);
                setTopLikedPosts(top10LikedPosts);
                const sortedByReplies = [...allPostsArray].sort((a, b) => {
                    const repliesA = Object.keys(a.Replies || {}).length;
                    const repliesB = Object.keys(b.Replies || {}).length;
                    return repliesB - repliesA;
                });
                const top10RepliedPosts = sortedByReplies.slice(0, 10);
                setTopRepliedPosts(top10RepliedPosts);
            })
            .catch((error) => console.error("Failed to fetch top posts", error));
    }, []);

    return (
        <div>
            <h1>Top 10 Most Liked Posts</h1>
            {topLikedPosts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul>
                    {topLikedPosts.map((post, index) => (
                        <li key={index}  className='post-item'>
                            <Link to={`/category/${post.categoryId}/${post.subcategoryId}/${post.id}`}>
                                {post.Title}
                            </Link>
                            <p>Likes: {Object.keys(post.likedBy || {}).length}</p>
                        </li>
                    ))}
                </ul>
            )}

            <h1>Top 10 Most Replied-To Posts</h1>
            {topRepliedPosts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul>
                    {topRepliedPosts.map((post, index) => (
                        <li key={index}   className='post-item'>
                            <Link to={`/category/${post.categoryId}/${post.subcategoryId}/${post.id}`}>
                                {post.Title}
                            </Link>
                            <p>Replies: {Object.keys(post.Replies || {}).length}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TopPosts;