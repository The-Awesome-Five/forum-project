import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllPosts, getSubcategoriesByPostId } from '../../../services/post.service.js';
import { getCategoryIdBySubcategoryId } from '../../../services/category.service.js';


export const RecentPosts = () => {
    const [posts, setPosts] = useState([]);
    const [links, setLinks] = useState([]);
    const navigate= useNavigate();
    useEffect(() => {
        getAllPosts()
            .then(async (postsObject) => {
                const allPostsArray = Object.values(postsObject); 

                const sortedPosts = allPostsArray.sort((a, b) => {
                    const dateA = new Date(a.CreatedOn).getTime();
                    const dateB = new Date(b.CreatedOn).getTime();
                    return dateB - dateA; 
                });
                const top10Posts = sortedPosts.slice(0, 10); 

                setPosts(top10Posts);

                const linksData = await Promise.all(
                    top10Posts.map(async (post) => {
                        const subcategoryId = await getSubcategoriesByPostId(post.id);
                        const categoryId = await getCategoryIdBySubcategoryId(subcategoryId);
                        return {
                            id: post.id,
                            link: `/category/${categoryId}/${subcategoryId}/${post.id}`,
                            title: post.Title || 'No Title',
                            subcategoryId,
                            categoryId,
                        };
                    })
                );
                setLinks(linksData);
            })
            .catch((error) => console.error("Failed to fetch posts or links", error));
    }, []);

    return (
        <div className='latest-container'>
            <h1>Recent Posts</h1>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <div>
                 
                    {posts.map((post, index) => (
                        <ul key={index} className='post-item'>
                            <ul><Link to={links[index]?.link}>{post.Title}</Link></ul>
                            
                            <p><Link to={`/profile/${post.createdBy?.ID}`}>{post.createdBy?.username}</Link></p>
                            <p>{new Date(post.CreatedOn).toLocaleDateString()}</p>


                            
                    

                         
                        </ul>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentPosts;