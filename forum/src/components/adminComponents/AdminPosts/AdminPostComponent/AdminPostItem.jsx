import {useEffect, useState} from "react";
import './AdminPostItem.css'
import {getSubcategoryNameBySubcategoryId} from "../../../../services/subcategory.service.js";
import {Link} from "react-router-dom";

export const AdminPostItem = ({post}) => {

    const [subcategory, setSubcategory] = useState('')

    useEffect(() => {
        if(!post.isHeader) {
            getSubcategoryNameBySubcategoryId(post.subcategoryId)
                .then(data => setSubcategory(data.name))
                .catch(e => alert(e));
        }
    }, []);

    return (
        <ul className={post.isHeader ? "admin-post-item-header" : "admin-post-item"}>
            <li>{post.Title}</li>
            <li>{post.Content}</li>
            <li>{post.isHeader ? "Created By" : post.createdBy.username}</li>
            <li>{post.CreatedOn}</li>
            <li>{post.isHeader ? 'Subcategory' : subcategory}</li>
            {post.isHeader ? "Buttons" :
                <div className="admin-post-item-buttons">
                    <button><Link to='/edit-post' state={{postToBeEdited: post}}>Edit</Link></button>
                    <button>Hide</button>
                    <button>Lock</button>
                    <button>Delete</button>
                </div>
            }
        </ul>
    )
}
