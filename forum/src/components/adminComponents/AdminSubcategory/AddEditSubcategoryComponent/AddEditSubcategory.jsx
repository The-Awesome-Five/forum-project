import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    editWholeCategory,
    getAllCategories,
    getCategoryIdBySubcategoryId
} from "../../../../services/category.service.js";
import {createSubcategory, editSubcategory} from "../../../../services/subcategory.service.js";
import "./AddEditSubcategory.css"

export const AddEditSubcategory = ({setCreateMenuVisible}) => {
    const [subcategory, setSubcategory] = useState({})
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [categoryId, setCategoryId] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    const navigate = useNavigate();

    const location = useLocation();
    let subcategoryToBeEdited;

    if (location.state && location.state.subcategoryToBeEdited) {
        subcategoryToBeEdited = location.state.subcategoryToBeEdited;
    }

    useEffect(() => {
        if (subcategoryToBeEdited) {
            setSubcategory(subcategoryToBeEdited);
            getCategoryIdBySubcategoryId(subcategoryToBeEdited.id)
                .then(data => {
                    setCategoryId(data)
                })
                .catch(e => alert(e));
            setIsEdit(true);
        } else {
            getAllCategories()
                .then(data => {
                    return setCategories(data)
                })
                .catch(e => alert(e));
        }
    }, [categories])


    const updateSubcategory = (prop) => (e) => {

        const propValue = e.target.value;
        let category;

        if (prop === 'category') {
            setDropdownVisible(false);
            category = categories.filter(cat => cat.name === propValue)[0];
            setSelectedCategory(category.name)
        }

        setSubcategory((prevSubcategory) => ({
            ...prevSubcategory,
            [prop]: prop === 'category' ? category.id : e.target.value
        }));

    };

    const handleBlur = (e) => {

        if (e.relatedTarget && e.relatedTarget.className === "dropdown-menu-subcategory-list") {
            return
        } else {
            setDropdownVisible(false)
        }
    }

    const submitHandler = async () => {

        const {name, imgUrl, category} = subcategory;

        if (!name || !imgUrl) {
            return alert('Please fill all of the needed fields');
        }

        if (!isEdit && !category) {
            return alert('Please select a category');
        }

        if (name.length < 8 || 32 < name.length) {
            return alert('Name should be between 8 and 32 symbols');
        }

        try {

            if (isEdit) {
                await editSubcategory(subcategory, categoryId, subcategory.id);
            } else {
                await createSubcategory(name, imgUrl, category);
                setCreateMenuVisible(false);
            }


            navigate('/subcategory-management');
        } catch (e) {
            alert('Current Error: ' + e)
        }
    }

    return (
        <div className="add-subcategory-container">
            <div className="add-subcategory-form">
                <h2>{isEdit ? 'Edit' : 'Add'} Subcategory</h2>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={subcategory.name} onChange={updateSubcategory('name')}/>
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input type="text" value={subcategory.imgUrl} onChange={updateSubcategory('imgUrl')}/>
                </div>
                {!isEdit && <div className="form-group" onBlur={handleBlur}>
                    <label>Select Parent Category:</label>
                    <input
                        type="text"
                        onFocus={() => setDropdownVisible(true)}
                        className="dropdown-menu-input"
                        value={selectedCategory || ''}
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
                </div>}
                <button className="add-subcategory-save-button" onClick={submitHandler}>{isEdit ? 'Edit' : 'Add'} Subcategory</button>
            </div>
        </div>
    )
}
