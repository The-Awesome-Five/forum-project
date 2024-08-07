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
                <h3>For all of your PC Gaming stuff</h3>
            </div>
            <div className='category-subcategory'>
                <Link to='/category/pc/hardware'> PC Hardware </Link>
                <Link to='/category/pc/games'> PC Games </Link>
                <Link to='/category/pc/news'> PC News </Link>
            </div>
        </div>
    )

}
