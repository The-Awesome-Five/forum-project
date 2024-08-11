import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {createCategory, getAllCategories} from "../../../services/category.service.js";
import {createSubcategory} from "../../../services/subcategory.service.js";
import "./AddSubcategory.css"

export const AddSubcategory = () => {
    const [subcategory, setSubcategory] = useState({})
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})
    const [options] = useState([categories]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories()
            .then(data => {
                console.log(data)
                return setCategories(data)
            })
            .catch(e => alert(e));
    }, [])


    const updateSubcategory = (prop) => (e) => {

        if (prop === 'category') {
            setDropdownVisible(true);
            setCategory(categories.filter(category => category.name === e.target.value))
        } else {
            setDropdownVisible(false);
        }
        setSubcategory((prevSubcategory) => ({

            ...prevSubcategory,
            [prop]: prop === 'category' ? category.id : e.target.value
        }));
    };

    const handleBlur = () => {
        setDropdownVisible(false);
    }

    const createSubcategoryHandler = async () => {

        const {name, imgUrl, category} = subcategory;

        if (!name || !category || !imgUrl) {
            return alert('Please fill all of the needed fields');
        }
        if (name.length < 8 || 32 < name.length) {
            return alert('Name should be between 8 and 32 symbols');
        }

        try {

            await createSubcategory({name, imgUrl, category});

            navigate('/');
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className="add-subcategory-container">
            <div className="add-subcategory-form">
                <h2>Add Subcategory</h2>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input type="text" value={subcategory.imgUrl} onChange={updateSubcategory('imgUrl')}/>
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={subcategory.name} onChange={updateSubcategory('name')}/>
                </div>
                <div className="add-subcategory-dropdown-menu">
                    <input
                        type="text"
                        value={category.name}
                        onChange={updateSubcategory('category')}
                        onFocus={() => setDropdownVisible(true)}
                        className="dropdown-menu-input"
                        onBlur={handleBlur}
                    />
                    {isDropdownVisible && (
                        <ul className='dropdown-menu-subcategory-list'>
                            {categories.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => updateSubcategory('category')}
                                    className="dropdown-menu-list-item"
                                >
                                    {option.name}
                                </li>
                            ))}
                            {options.length === 0 && (
                                <li className="dropdown-menu-list-item">No options found</li>
                            )}
                        </ul>
                    )}
                </div>
                <button className="add-subcategory-save-button" onClick={createSubcategoryHandler}>Save Changes</button>
            </div>
        </div>
    )
}
