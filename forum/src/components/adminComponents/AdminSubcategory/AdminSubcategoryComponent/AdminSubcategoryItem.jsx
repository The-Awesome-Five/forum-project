import './AdminSubcategoryItem.css'
import {useEffect, useState} from "react";
import {getCategoryNameBySubcategoryId} from "../../../../services/category.service.js";

export const AdminSubcategoryItem = ({subcategory}) => {

    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if(!subcategory.isHeader && subcategory.id) {
            getCategoryNameBySubcategoryId(subcategory.id)
                .then(data => setCategoryName(data.name))
                .catch(e => alert('Failed to get category name', e));
            }
    }, [])


    return (
        <ul className={subcategory.isHeader ? "admin-subcategory-item-header" : "admin-subcategory-item"}>
            <li className="admin-subcategory-item-image">{subcategory.isHeader ? "Subcategory Image" :
                <img src={subcategory.imgUrl} alt="subcategory-imgUrl"/>}</li>
            <li>{subcategory.name}</li>
            <li>{subcategory.isHeader ? "Parent Category" : categoryName}</li>
            {subcategory.isHeader ? "Buttons" :
                <div className="admin-subcategory-item-buttons">
                    <button>Edit</button>
                    <button>Hide</button>
                    <button>Lock</button>
                </div>
            }
        </ul>
    )
}
