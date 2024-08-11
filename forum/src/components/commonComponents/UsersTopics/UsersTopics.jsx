import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getUserPosts } from '../../../firebase/firebase-funcs.js';
import { AppContext } from '../../../../state/app.context.js';
import { getSubcategoriesByPostId } from '../../../services/post.service.js';
import { getCategoryIdBySubcategoryId } from '../../../services/category.service.js';

const UsersTopics = () => {
    const { user, userData } = useContext(AppContext);
    const [posts, setPosts] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        if (user && userData) {
            getUserPosts(user.uid)
                .then(async (posts) => {
                    setPosts(posts);
                    const linksData = await Promise.all(
                        posts.map(async (post) => {
                            const subcategoryId = await getSubcategoriesByPostId(post.id);
                            const categoryId = await getCategoryIdBySubcategoryId(subcategoryId);
                            return {
                                id: post.id,
                                link: `/category/${categoryId}/${subcategoryId}/${post.id}`,
                                title: post.Title || 'No Title',
                            };
                        })
                    );
                    setLinks(linksData);
                })
                .catch((error) => console.error("Failed to fetch posts or links", error));
        }
    }, [user, userData]);

    if (!user || !userData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{userData.username}'s Posts</h1>
        
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul>
                    {links.map((linkData) => (
                        <li key={linkData.id}>
                            <Link to={linkData.link}>
                                {linkData.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersTopics;