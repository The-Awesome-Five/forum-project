import {Category} from "../../components/commonComponents/CategoryComponent/Category.jsx";
import './CategoryView.css'
import {useEffect, useState} from "react";
import {getAllCategories} from "../../services/category.service.js";

export const CategoryView = () => {

    const [ categories, setCategories ] = useState([]);

    useEffect(() => {
        getAllCategories()
            .then(data => setCategories(data))
    }, []);

    return (
        <div className='category-view'>
            {categories && categories.filter(cat => !cat.isHidden).map(category => <Category key={category.id} category={category}/>)}
        </div>
    )

}
