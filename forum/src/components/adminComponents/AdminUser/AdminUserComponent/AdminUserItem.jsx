import {useEffect, useState} from "react";
import {getCategoryNameBySubcategoryId} from "../../../../services/category.service.js";
import {getPostsByUserId} from "../../../../services/post.service.js";
import './AdminUserItem.css'

export const AdminUserItem = ({user}) => {

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
                    <button>Edit</button>
                    <button>Block</button>
                </div>
            }
        </ul>
    )

}
