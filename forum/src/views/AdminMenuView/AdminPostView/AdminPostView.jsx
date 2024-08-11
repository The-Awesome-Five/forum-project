import {useEffect, useState} from "react";
import {getAllPosts} from "../../../services/post.service.js";
import {AdminPostItem} from "../../../components/adminComponents/AdminPostComponent/AdminPostItem.jsx";

export const AdminPostView = () => {

    const [posts, setPosts] = useState([]);

    const postHeader = {
        Title: 'Title',
        Content: 'Content',
        CreatedOn: 'Created On',
        subcategory: 'Subcategory',
        isHeader: true
    }

    useEffect(() => {
        getAllPosts()
            .then(data => setPosts(Object.entries(data).map(([key, value]) => value)))
    }, []);

    console.log(posts)

    return (
        <div className="admin-post-view">
            <AdminPostItem post={postHeader}/>
            {posts && posts.map(post => <AdminPostItem key={post.id} post={post}/>)}
        </div>

    )
}