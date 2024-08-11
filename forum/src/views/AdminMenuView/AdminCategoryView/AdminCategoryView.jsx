import {AdminCategoryItem} from "../../../components/adminComponents/AdminCategoryComponent/AdminCategoryItem.jsx";
import {AddCategory} from "../../../components/adminComponents/AddCategoryComponent/AddCategory.jsx";
import {useEffect, useState} from "react";
import {getAllCategories} from "../../../services/category.service.js";

export const AdminCategoryView = () => {

    const [createMenuVisible, setCreateMenuVisible] = useState(false);
    const [categories, setCategories] = useState([]);

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
            <AdminCategoryItem category={categoryHeader}/>
            {categories && categories.map(category => <AdminCategoryItem key={category.id} category={category}/>)}
        </div>
    )
}