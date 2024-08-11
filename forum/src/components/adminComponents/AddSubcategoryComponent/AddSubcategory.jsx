import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {createCategory, getAllCategories} from "../../../services/category.service.js";
import {createSubcategory} from "../../../services/subcategory.service.js";
import "./AddSubcategory.css"

export const AddSubcategory = () => {
    const [subcategory, setSubcategory] = useState({})
    const [categories, setCategories] = useState([])
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories()
            .then(data => {
                return setCategories(data)
            })
            .catch(e => alert(e));
    }, [categories])


    const updateSubcategory = (prop) => (e) => {

        const propValue = e.target.value;
        let category;

        if (prop === 'category') {
            setDropdownVisible(false);
            category = categories.filter(cat => cat.name === propValue)[0].id;
        }

        setSubcategory((prevSubcategory) => ({
            ...prevSubcategory,
            [prop]: prop === 'category' ? category : e.target.value
        }));

    };

    const handleBlur = (e) => {

        if (e.relatedTarget && e.relatedTarget.className === "dropdown-menu-subcategory-list") {
            return
        } else {
            setDropdownVisible(false)
        }
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

            await createSubcategory(name, imgUrl, category);

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
                    <label>Name:</label>
                    <input type="text" value={subcategory.name} onChange={updateSubcategory('name')}/>
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input type="text" value={subcategory.imgUrl} onChange={updateSubcategory('imgUrl')}/>
                </div>
                <div className="form-group" onBlur={handleBlur}>
                    <label>Select Category:</label>
                    <input
                        type="text"
                        onFocus={() => setDropdownVisible(true)}
                        className="dropdown-menu-input"
                    />

                    {isDropdownVisible && (
                        <select
                            onChange={updateSubcategory('category')}
                            size={categories.length}
                            className="dropdown-menu-subcategory-list"
                            onBlur={() => setDropdownVisible(false)}
                        >
                            {categories.map((option, index) => (
                                <option key={index} value={option.name} className="dropdown-menu-list-item">
                                    {option.name}
                                </option>
                            ))}
                            {categories.length === 0 && (
                                <option className="dropdown-menu-list-item">No categories found</option>
                            )}
                        </select>
                    )}
                </div>
                <button className="add-subcategory-save-button" onClick={createSubcategoryHandler}>Save Changes</button>
            </div>
        </div>
    )
}
