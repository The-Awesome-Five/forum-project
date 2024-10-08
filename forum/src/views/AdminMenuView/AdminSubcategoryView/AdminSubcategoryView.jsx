import {useEffect, useState} from "react";
import {getAllSubcategories} from "../../../services/subcategory.service.js";
import {AddEditSubcategory} from "../../../components/adminComponents/AdminSubcategory/AddEditSubcategoryComponent/AddEditSubcategory.jsx";
import {
    AdminSubcategoryItem
} from "../../../components/adminComponents/AdminSubcategory/AdminSubcategoryComponent/AdminSubcategoryItem.jsx";
import {toast} from "react-toastify";

export const AdminSubcategoryView = () => {

    const [createMenuVisible, setCreateMenuVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [refresh, setRefresh] = useState();

    const subcategoryHeader = {
        name: 'Name',
        imgUrl: 'Image URL',
        isHeader: true,
        category_name: 'Parent Category'
    }

    useEffect(() => {
        getAllSubcategories()
            .then(data => setCategories(data))
            .catch(e => toast.error('Failed to get categories', e));
    }, [refresh]);

    return (
        <div className="admin-subcategory-view">
            {createMenuVisible
                ? <div className="admin-menu-create-subcategory">
                    <AddEditSubcategory setCreateMenuVisible={setCreateMenuVisible} setRefresh={setRefresh}/>
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
