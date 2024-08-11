import './AdminCategoryItem.css'

export const AdminCategoryItem = ({category}) => {

    return (
        <ul className="admin-category-item">
            <li>{category.name}</li>
            <li>{category.description}</li>
            <ul>
                {Object.values(category.subcategory_ids).map(subcategory => <li key={subcategory.id}>{subcategory.name}</li>)}
            </ul>
            <div className="admin-category-item-buttons">
            <button>Edit</button>
            <button>Delete</button>
            </div>
        </ul>
    )
}