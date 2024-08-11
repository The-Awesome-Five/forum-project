import './AdminCategoryItem.css'
import {Link} from "react-router-dom";

export const AdminCategoryItem = ({category}) => {

    return (
        <ul className={category.isHeader ? "admin-category-item-header" : "admin-category-item"}>
            <li className="admin-category-item-image">{category.isHeader ? "Category Image" : <img src={category.imgUrl} alt="category-imgUrl"/>}</li>
            <li>{category.name}</li>
            <li>{category.description}</li>
            <ul>
                {Object.values(category.subcategory_ids).map(subcategory => <li key={subcategory.id}>
                    {category.isHeader
                        ? subcategory.name
                        :<Link to={`/category/${category.id}/${subcategory.id}`}>{subcategory.name}</Link>
                    }</li>)}
            </ul>
            {category.isHeader ? "Buttons" :
                <div className="admin-category-item-buttons">
                    <button>Edit</button>
                    <button>Hide</button>
                    <button>Delete</button>
                </div>
            }
        </ul>
    )
}