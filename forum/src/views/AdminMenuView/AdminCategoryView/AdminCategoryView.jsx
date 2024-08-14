import {AdminCategoryItem} from "../../../components/adminComponents/AdminCategory/AdminCategoryComponent/AdminCategoryItem.jsx";
import {useEffect, useState} from "react";
import {getAllCategories} from "../../../services/category.service.js";
import {
    AddEditCategory
} from "../../../components/adminComponents/AdminCategory/AddEditCategoryComponent/AddEditCategory.jsx";
import {toast} from "react-toastify";

export const AdminCategoryView = () => {

    const [createMenuVisible, setCreateMenuVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [ refresh, setRefresh ] = useState(false);

    const categoryHeader = {
        name: 'Name',
        description: 'Description',
        imgUrl: 'Image URL',
        subcategory_ids: {
            123456: {
                id: 123456,
                name: "Subcategories"
            },
        },
        isHeader: true
    }

    useEffect(() => {
        getAllCategories()
            .then(data => setCategories(data))
            .catch(e => toast.error('Failed to get categories', e));
    }, [refresh]);

    return (
        <div className="admin-category-view">
            {createMenuVisible
                ? <div className="admin-menu-create-category">
                    <AddEditCategory setRefresh={setRefresh}/>
                    <button type="button" onClick={() => setCreateMenuVisible(false)}>Close</button>
                </div>
                : <button type="button" onClick={() => setCreateMenuVisible(true)}>Create Category</button>}
            <AdminCategoryItem category={categoryHeader}/>
            {categories && categories.map(category => <AdminCategoryItem key={category.id} category={category}/>)}
        </div>
    )
}
