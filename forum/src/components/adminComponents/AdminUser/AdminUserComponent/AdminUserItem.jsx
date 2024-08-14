import {useEffect, useState} from "react";
import {getCategoryNameBySubcategoryId} from "../../../../services/category.service.js";
import {getPostsByUserId} from "../../../../services/post.service.js";
import './AdminUserItem.css'
import {Link} from "react-router-dom";
import {blockUser, unblockUser} from "../../../../services/user.service.js";
import {toast} from "react-toastify";

export const AdminUserItem = ({user}) => {

    const [isBlocked, setIsBlocked] = useState(user.isBlocked ? user.isBlocked : false);

    const blockHandler = async () => {
        try {
            if (isBlocked) {
                await unblockUser(user.uid)
                setIsBlocked(false);
                toast.success(`The ${user.username} is un-blocked!`)
            } else {
                await blockUser(user.uid);
                setIsBlocked(true);
                toast.success(`The ${user.username} is blocked!`)
            }
        } catch (e) {
            toast.error(e)
        }
    }

    return (
        <ul className={user.isHeader ? "admin-user-item-header" : "admin-user-item"}>
            <li className="admin-user-item-image">{user.isHeader ? "Avatar Image" :
                <img src={user.avatarUrl} alt="user-imgUrl"/>}</li>
            <li>{user.username}</li>
            <li>{user.isHeader ? user.name :`${user.firstName} ${user.lastName}`}</li>
            <li>{user.email}</li>
            <li>{user.customInfo}</li>
            <li>{user.role}</li>
            {user.isHeader ? "Buttons" :
                <div className="admin-user-item-buttons">
                    <button><Link to={`/edit-profile/${user.uid}`}>Edit </Link></button>
                    <button onClick={blockHandler}>{isBlocked ? 'Unblock' : 'Block'}</button>
                </div>
            }
        </ul>
    )

}
