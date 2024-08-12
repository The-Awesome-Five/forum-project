import './AdminSubcategoryItem.css'
import {useEffect, useState} from "react";
import {
    getCategoryIdBySubcategoryId,
    getCategoryNameBySubcategoryId,
    hideCategory,
    showCategory
} from "../../../../services/category.service.js";
import {Link} from "react-router-dom";
import {hideSubcategory, showSubcategory} from "../../../../services/subcategory.service.js";

export const AdminSubcategoryItem = ({subcategory}) => {

    const [category, setCategory] = useState({
        name:'',
        id: ''
    });
    const [isHidden, setHidden] = useState(subcategory.isHidden);

    useEffect(() => {
        if(!subcategory.isHeader && subcategory.id) {
            getCategoryNameBySubcategoryId(subcategory.id)
                .then(data => setCategory(sub => {
                    return {
                        ...sub,
                        name: data
                    }}))
                .catch(e => alert('Failed to get category name', e));
            }
        getCategoryIdBySubcategoryId(subcategory.id)
            .then(data => setCategory(sub => {
                return {
                    ...sub,
                    id: data
            }}))
            .catch(e => alert('Failed to get category id', e));

    }, [])

    const hideHandler = async () => {
        try {
            if (!isHidden) {
                await hideSubcategory(category.id, subcategory.id);
                setHidden(true);
            } else {
                await showSubcategory(category.id, subcategory.id);
                setHidden(false);
            }
        } catch (e) {
            alert(e)
        }
    }


    return (
        <ul className={subcategory.isHeader ? "admin-subcategory-item-header" : "admin-subcategory-item"}>
            <li className="admin-subcategory-item-image">{subcategory.isHeader ? "Subcategory Image" :
                <img src={subcategory.imgUrl} alt="subcategory-imgUrl"/>}</li>
            <li>{subcategory.name}</li>
            <li>{subcategory.isHeader ? "Parent Category" : category.name}</li>
            {subcategory.isHeader ? "Buttons" :
                <div className="admin-subcategory-item-buttons">
                    <button><Link to={"/edit-subcategory"} state={{ subcategoryToBeEdited: subcategory }}>Edit</Link></button>
                    <button onClick={hideHandler}>{isHidden ? 'Show' : 'Hide'}</button>
                    <button>Lock</button>
                </div>
            }
        </ul>
    )
}
