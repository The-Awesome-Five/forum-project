import {useEffect, useState} from "react";
import './AdminPostItem.css'
import {getSubcategoryNameBySubcategoryId} from "../../../../services/subcategory.service.js";
import {Link} from "react-router-dom";
import {hidePost, lockPost, showPost, unlockPost} from "../../../../services/post.service.js";

export const AdminPostItem = ({post}) => {

    const [subcategory, setSubcategory] = useState('');
    const [isHidden, setHidden] = useState(post.isHidden);
    const [isLocked, setLocked] = useState(post.isLocked);

    useEffect(() => {
        if(!post.isHeader) {
            getSubcategoryNameBySubcategoryId(post.subcategoryId)
                .then(data => setSubcategory(data.name))
                .catch(e => alert(e));
        }
    }, []);

    const hideHandler = async () => {

        try {
            if (!isHidden) {
                await hidePost(post.subcategoryId, post.id);
                setHidden(true);
                setLocked(true);
            } else {
                await showPost(post.subcategoryId, post.id);
                setHidden(false);
                setLocked(false);
            }
        } catch(e) {
            alert(e)
        }

    }

    const lockHandler = async () => {
        if(!isLocked) {
            await lockPost(post.subcategoryId, post.id)
            setLocked(true);
        } else {
            await unlockPost(post.subcategoryId, post.id)
            setLocked(false);
        }
    }

    return (
        <ul className={post.isHeader ? "admin-post-item-header" : "admin-post-item"}>
            <li>{post.Title}</li>
            <li>{post.Content}</li>
            <li>{post.isHeader ? "Created By" : post.createdBy.username}</li>
            <li>{post.CreatedOn}</li>
            <li>{post.isHeader ? 'Subcategory' : subcategory}</li>
            {post.isHeader ? "Buttons" :
                <div className="admin-post-item-buttons">
                    <button><Link to='/edit-post' state={{postToBeEdited: post}}>Edit </Link></button>
                    <button onClick={hideHandler}>{isHidden ? 'Show' : 'Hide'} </button>
                    <button onClick={lockHandler}>{isLocked ? 'Unlock' : 'Lock'} </button>
                    <button>Delete</button>
                </div>
            }
        </ul>
    )
}
