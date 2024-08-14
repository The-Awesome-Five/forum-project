import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserPosts } from '../../../firebase/firebase-funcs.js';
import { AppContext } from '../../../state/app.context.js';
import { getSubcategoriesByPostId } from '../../../services/post.service.js';
import { getCategoryIdBySubcategoryId } from '../../../services/category.service.js';

const UsersTopics = () => {
    const { uid } = useParams();
    const [posts, setPosts] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        if (uid) {
            getUserPosts(uid)
                .then(async (posts) => {
                    setPosts(posts);

                    const linksData = await Promise.all(
                        posts.map(async (post) => {
                            const subcategoryId = await getSubcategoriesByPostId(post.id);
                            const categoryId = await getCategoryIdBySubcategoryId(subcategoryId);
                            const link = `/category/${categoryId}/${subcategoryId}/${post.id}`;
                            return {
                                id: post.id,
                                link,
                                title: post.Title || 'No Title',

                            };
                        })
                    );

                    setLinks(linksData);
                })
                .catch((error) => console.error("Failed to fetch posts or links", error));
        }
    }, [uid]);

    if (!posts.length) {
        return <p>No posts available.</p>;
    }
    console.log(uid)
    return (
        <div>
            <h1>User's Posts</h1>
            {links.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul>
                    {links.map((linkData) => (
                        <ul key={linkData.id}  className='post-item'>
                            <Link to={linkData.link}>
                                {linkData.title}
                            </Link>
                        </ul>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersTopics;
