import {useEffect, useState} from "react";
import {getAllSubcategories} from "../../../services/subcategory.service.js";
import {AddSubcategory} from "../../../components/adminComponents/AddSubcategoryComponent/AddSubcategory.jsx";
import {
    AdminSubcategoryItem
} from "../../../components/adminComponents/AdminSubcategoryComponent/AdminSubcategoryItem.jsx";

export const AdminSubcategoryView = () => {

    const [createMenuVisible, setCreateMenuVisible] = useState(false);
    const [categories, setCategories] = useState([]);

    const subcategoryHeader = {
        name: 'Name',
        imgUrl: 'Image URL',
        isHeader: true,
        category_name: 'Parent Category'
    }

    useEffect(() => {
        getAllSubcategories()
            .then(data => setCategories(data))
            .catch(e => alert('Failed to get categories', e));
    }, []);

    return (
        <div className="admin-subcategory-view">
            {createMenuVisible
                ? <div className="admin-menu-create-subcategory">
                    <AddSubcategory/>
                    <button type="button" onClick={() => setCreateMenuVisible(false)}>Close</button>
                </div>
                : <button type="button" onClick={() => setCreateMenuVisible(true)}>Create Subcategory</button>}
            <AdminSubcategoryItem subcategory={subcategoryHeader} />
            {categories && categories.map(category =>
                Object.entries(category)
                    .map(([key, subcategory]) => (
                        <AdminSubcategoryItem
                            key={subcategory.id}
                            subcategory={subcategory}
                        />
                    ))
            )
            }
        </div>
    )
}