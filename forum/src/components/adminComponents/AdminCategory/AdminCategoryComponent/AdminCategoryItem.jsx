import './AdminCategoryItem.css'
import {Link} from "react-router-dom";
import {hideCategory, showCategory} from "../../../../services/category.service.js";
import {useState} from "react";

export const AdminCategoryItem = ({category}) => {

    const [hidden, setHidden] = useState(category.isHidden)

    const hideHandler = async () => {
        try {
            if (!hidden) {
                await hideCategory(category.id);
                setHidden(true);
            } else {
                await showCategory(category.id);
                setHidden(false);
            }
        } catch (e) {
            alert(e)
        }
    }

    return (
        <ul className={category.isHeader ? "admin-category-item-header" : "admin-category-item"}>
            <li className="admin-category-item-image">{category.isHeader ? "Category Image" : <img src={category.imgUrl} alt="category-imgUrl"/>}</li>
            <li>{category.name}</li>
            <li>{category.description}</li>
            <ul>
                {category.subcategory_ids && Object.values(category.subcategory_ids).map(subcategory => <li key={subcategory.id}>
                    {category.isHeader
                        ? subcategory.name
                        :<Link to={`/category/${category.id}/${subcategory.id}`}>{subcategory.name}</Link>
                    }</li>)}
            </ul>
            {category.isHeader ? "Buttons" :
                <div className="admin-category-item-buttons">
                    <button><Link to={"/edit-category"} state={{ categoryToBeEdited: category }}>Edit</Link></button>
                    <button onClick={hideHandler}>{hidden ? 'Show' : 'Hide'}</button>
                </div>
            }
        </ul>
    )
}
