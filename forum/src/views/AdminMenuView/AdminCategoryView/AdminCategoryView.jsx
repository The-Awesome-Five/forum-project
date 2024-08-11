import {AdminCategoryItem} from "../../../components/adminComponents/AdminCategoryComponent/AdminCategoryItem.jsx";
import {AddCategory} from "../../../components/adminComponents/AddCategoryComponent/AddCategory.jsx";

export const AdminCategoryView = () => {


    return (
        <div className="admin-category-view">
            <AddCategory/>
            <AdminCategoryItem/>
            <AdminCategoryItem/>
            <AdminCategoryItem/>
        </div>
    )
}