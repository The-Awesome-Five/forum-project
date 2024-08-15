import {Link} from "react-router-dom";
import './AdminMenu.css'

export const AdminMenu = () => {

    return (
        <div className="admin-links">
            <Link to="/category-management">Category Management</Link>
            <Link to="/subcategory-management">Subcategory Management</Link>
            <Link to="/post-management">Post Management</Link>
            <Link to="/user-management">User Management</Link>
            <Link to="/reported-posts">Reported Posts</Link>
        </div>
    )
}