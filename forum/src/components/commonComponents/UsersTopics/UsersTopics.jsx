import React, { useEffect, useState, useContext } from 'react';
import { getUserPosts } from '../../../firebase/firebase-funcs.js';
import { AppContext } from '../../../../state/app.context.js';

const UsersTopics = () => {
    const { user, userData } = useContext(AppContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // const fetchUserPosts = async () => {
        //     if (user && userData) {
        //         const userPosts = await getUserPosts(user.uid);
        //         setPosts(userPosts);
        //     }
        // };

        // fetchUserPosts();

        if (user && userData) {
            getUserPosts(user.uid)
            .then(data => data)
            .then(posts => setPosts(posts))
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
                    {posts.map((post, index) => (
                        <>
                        <li key={post.id || index}>{post.Title || 'No Title'}</li>
                        </>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersTopics;