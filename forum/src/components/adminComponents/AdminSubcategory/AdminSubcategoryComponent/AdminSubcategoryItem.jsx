import './AdminSubcategoryItem.css'
import {useEffect, useState} from "react";
import {
    getCategoryIdBySubcategoryId,
    getCategoryNameBySubcategoryId,
} from "../../../../services/category.service.js";
import {Link} from "react-router-dom";
import {
    hideSubcategory,
    lockSubcategory,
    showSubcategory,
    unlockSubcategory
} from "../../../../services/subcategory.service.js";

export const AdminSubcategoryItem = ({subcategory}) => {

    const [category, setCategory] = useState({
        name:'',
        id: ''
    });
    const [isHidden, setHidden] = useState(subcategory.isHidden);
    const [isLocked, setLocked] = useState(subcategory.isLocked);

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
                setLocked(true);
            } else {
                await showSubcategory(category.id, subcategory.id);
                setHidden(false);
                setLocked(false);
            }
        } catch (e) {
            alert(e)
        }
    }


    const lockHandler = async () => {
        try {
            if (!isLocked) {
                await lockSubcategory(category.id, subcategory.id);
                setLocked(true);
            } else {
                await unlockSubcategory(category.id, subcategory.id);
                setLocked(false);
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
                    <button onClick={lockHandler}>{isLocked ? 'Unlock' : 'Lock'}</button>
                </div>
            }
        </ul>
    )
}
