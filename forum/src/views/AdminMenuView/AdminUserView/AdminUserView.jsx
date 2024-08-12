import {useEffect, useState} from "react";
import {getAllUsers} from "../../../services/user.service.js";
import {AdminUserItem} from "../../../components/adminComponents/AdminUserComponent/AdminUserItem.jsx";

export const AdminUserView = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers()
            .then(data => setUsers(data))
            .catch(e => alert(e))
    },[])

    const userHeader = {
        name: 'Name',
        username: 'Username',
        avatarUrl: 'Avatar Image',
        customInfo: 'Custom Info',
        email: 'Email',
        isHeader: true,
        category_name: 'Parent Category',
        role: 'User'
    }

    return (
        <div className="admin-user-viewe">
            <AdminUserItem user={userHeader}/>
            {users && users.map(user => <AdminUserItem key={user.id} user={user}/>)}
        </div>
    )

}
