import {Link} from "react-router-dom";
import './Category.css'
import {useEffect, useState} from "react";
import {getSubcategoriesByCategoryId} from "../../../services/subcategory.service.js";

export const Category = ({category}) => {

    const [subcategories, setSubcategories ] = useState([]);

    useEffect(() => {
        getSubcategoriesByCategoryId(category.id)
            .then(data => data ? setSubcategories(Object.values(data)) : '')
            .catch(e => alert(e))
    }, []);


    return (
        <div className='category'>
            <div className="category-logo">
                <img src={category.imgUrl} alt="logo"/>
            </div>
            <div className='category-title'>
                <h2>{category.name}</h2>
                <p>{category.description ? category.description : ''}</p>
            </div>
            <div className='category-subcategory'>
                {subcategories && subcategories.filter(sub => !sub.isHidden).map(subcategory => <Link key={subcategory.id} to={`/category/${category.id}/${subcategory.id}`}>
                        <img src={subcategory.imgUrl} alt="logo"/> {subcategory.name}
                </Link>)}
            </div>
        </div>
    )

}
