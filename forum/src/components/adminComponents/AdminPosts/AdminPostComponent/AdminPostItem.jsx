import {useEffect, useState} from "react";
import './AdminPostItem.css'
import {getSubcategoryNameBySubcategoryId} from "../../../../services/subcategory.service.js";
import {Link} from "react-router-dom";
import {deletePost, hidePost, lockPost, showPost, unlockPost} from "../../../../services/post.service.js";
import {toast} from "react-toastify";

export const AdminPostItem = ({post, setRefresh}) => {

    const [subcategory, setSubcategory] = useState('');
    const [isHidden, setHidden] = useState(post.isHidden);
    const [isLocked, setLocked] = useState(post.isLocked);


    useEffect(() => {
        if(!post.isHeader) {
            getSubcategoryNameBySubcategoryId(post.subcategoryId)
                .then(data => setSubcategory(data.name))
                .catch(e => toast.error(e));
        }
    }, []);

    const hideHandler = async () => {

        try {
            if (!isHidden) {
                await hidePost(post.subcategoryId, post.id);
                setHidden(true);
                setLocked(true);
                toast.success(`The ${post.Title} has been hidden!`)
            } else {
                await showPost(post.subcategoryId, post.id);
                setHidden(false);
                setLocked(false);
                toast.success(`The ${post.Title} is no longer hidden!`)
            }
        } catch(e) {
            toast.error(e)
        }

    }

    const lockHandler = async () => {
        if(!isLocked) {
            await lockPost(post.subcategoryId, post.id)
            setLocked(true);
            toast.success(`The ${post.Title} has been locked!`)
        } else {
            await unlockPost(post.subcategoryId, post.id)
            setLocked(false);
            toast.success(`The ${post.Title} has been unlocked!`)

        }
    }

    const deleteHandler = async () => {

        try {
            await deletePost(post.subcategoryId, post.id);
            setRefresh(prev => !prev);
            toast.success(`The ${post.Title} has been deleted!`);
        } catch (e) {
            toast.error(e)
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
                    <button onClick={deleteHandler}>Delete</button>
                </div>
            }
        </ul>
    )
}
