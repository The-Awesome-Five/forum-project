import {AdminCategoryItem} from "../../../components/adminComponents/AdminCategoryComponent/AdminCategoryItem.jsx";
import {AddCategory} from "../../../components/adminComponents/AddCategoryComponent/AddCategory.jsx";
import {useEffect, useState} from "react";
import {getAllCategories} from "../../../services/category.service.js";

export const AdminCategoryView = () => {

    const [createMenuVisible, setCreateMenuVisible] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories()
            .then(data => setCategories(data))
            .catch(e => alert('Failed to get categories', e));
    }, []);

    return (
        <div className="admin-category-view">
            {createMenuVisible
                ? <div className="admin-menu-create-category">
                    <AddCategory/>
                    <button type="button" onClick={() => setCreateMenuVisible(false)}>Close</button>
                </div>
                : <button type="button" onClick={() => setCreateMenuVisible(true)}>Create Category</button>}
            {categories && categories.map(category => <AdminCategoryItem key={category.id} category={category}/>)}
        </div>
    )
}