import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {createCategory, editWholeCategory} from "../../../../services/category.service.js";
import './AddEditCategory.css'
import {toast} from "react-toastify";

export const AddEditCategory = ({setRefresh}) => {
    const [category, setCategory] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    const location = useLocation();
    let categoryToBeEdited;

    if (location.state && location.state.categoryToBeEdited) {
        categoryToBeEdited = location.state.categoryToBeEdited;
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (categoryToBeEdited) {
            setIsEdit(true);
            setCategory(categoryToBeEdited);
        }
    }, []);

    const updateCategory = (prop) => (e) => {

        setCategory((prevCategory) => ({

            ...prevCategory,
            [prop]: e.target.value,
        }));
    };

    const submitHandler = async () => {

        const {name, description, imgUrl} = category;

        if (!name || !description || !imgUrl) {
            return toast.error('Please fill all of the needed fields');
        }
        if (name.length < 8 || 32 < name.length) {
            return toast.error('Name should be between 8 and 32 symbols');
        }
        if (description.length < 16 || 64 < description.length) {
            return toast.error('Description needs to be between 16 and 64 symbols');
        }

        try {

            if (isEdit) {
                await editWholeCategory(category, category.id);
                toast.success(`Category ${name} has been edited successfully!`)
            } else {
                await createCategory(category);
                toast.success(`Category ${name} has been created successfully!`)
                setRefresh(prevRef => !prevRef)
            }

            navigate('/category-management');

        } catch (e) {
            toast.error(e)
        }
    }

    return (
        <div className="add-category-form">
            <h2>{isEdit ? 'Edit' : 'Add'} Category</h2>
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
            <button className="add-category-save-button" onClick={submitHandler}>{isEdit ? 'Edit' : 'Create'} Category</button>
        </div>
    )
}
