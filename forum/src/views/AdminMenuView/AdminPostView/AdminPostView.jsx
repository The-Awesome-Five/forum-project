import {useEffect, useState} from "react";
import {getAllPosts} from "../../../services/post.service.js";
import {AdminPostItem} from "../../../components/adminComponents/AdminPosts/AdminPostComponent/AdminPostItem.jsx";

export const AdminPostView = () => {

    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [sort, setSort] = useState('CreatedOn')

    const postHeader = {
        Title: 'Title',
        Content: 'Content',
        CreatedOn: 'Created On',
        subcategory: 'Subcategory',
        CreatedBy: "Created By",
        isHeader: true
    }

    useEffect(() => {
        getAllPosts()
            .then(data => setPosts(Object.entries(data).map(([key, value]) => value)
                .sort((a,b) => a[sort].localeCompare(b[sort]))))
    }, [refresh, sort]);

    return (
        <div className="admin-post-view">
            <AdminPostItem post={postHeader} setSort={setSort}/>
            {posts && posts.map(post => <AdminPostItem key={post.id} post={post} setRefresh={setRefresh}/>)}
        </div>

    )
}
