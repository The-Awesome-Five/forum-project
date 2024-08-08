import {Link} from "react-router-dom";
import './Category.css'

export const Category = () => {

    return (
        <div className='category'>
            <div className="category-logo">
                <img src="/img/category-logo-test.png" alt="logo"/>
            </div>
            <div className='category-title'>
                <h3>PC Gaming</h3>
                <p>For all of your PC Gaming stuff</p>
            </div>
            <div className='category-subcategory'>
                <Link to='/category/pc/hardware'> <img src="/img/subcategory-logo.png" alt="logo"/> PC Hardware
                </Link>
                <Link to='/category/pc/games'>  <img src="/img/subcategory-logo.png" alt="logo"/> PC Games </Link>
                <Link to='/category/pc/news'> <img src="/img/subcategory-logo.png" alt="logo"/> PC News </Link>
            </div>
        </div>
    )

}
