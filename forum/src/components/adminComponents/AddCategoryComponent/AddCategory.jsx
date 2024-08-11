import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createCategory} from "../../../services/category.service.js";
import './AddCategory.css'

export const AddCategory = () => {
    const [category, setCategory] = useState({})

    const navigate = useNavigate();

    const updateCategory = (prop) => (e) => {

        setCategory((prevCategory) => ({

            ...prevCategory,
            [prop]: e.target.value,
        }));
    };

    const createCategoryHandler = async () => {

        const {name, description, imgUrl} = category;

        if (!name || !description || !imgUrl) {
            return alert('Please fill all of the needed fields');
        }
        if (name.length < 8 || 32 < name.length) {
            return alert('Name should be between 8 and 32 symbols');
        }
        if (description.length < 16 || 32 < description.length) {
            return alert('Description needs to be between 16 and 32 symbols');
        }

        try {

            await createCategory(category);

            navigate('/');
        } catch (e) {
        }
    }

    return (
        <div className="add-category-form">
            <h2>Add Category</h2>
            <div className="form-group">
                <label>Name:</label>
            <input
                className='add-category-name'
                type="text"
                value={category.name}
                onChange={updateCategory('name')}
            />
            <br/>
            </div>
            <div className="form-group">
                <label>Description:</label>
                <textarea
                className='add-category-description'
                value={category.description}
                onChange={updateCategory('description')}
                rows="5"
            />
            </div>
            <br/>
            <div className="form-group">
                <label>Image URL:</label>
                <input
                className='add-category-imgurl'
                type="text"
                value={category.imgUrl}
                onChange={updateCategory('imgUrl')}
            />
            <br/>
            </div>
            <button className="add-category-save-button" onClick={createCategoryHandler}>Create Category</button>
        </div>
    )
}