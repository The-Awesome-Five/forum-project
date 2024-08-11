import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createCategory} from "../../../services/category.service.js";

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
        <div>
            <h2>Create Category</h2>
            <input
                type="text"
                placeholder="Name"
                value={category.name}
                onChange={updateCategory('name')}
            />
            <br/>
            <textarea
                placeholder="Description"
                value={category.description}
                onChange={updateCategory('description')}
                rows="5"
            />
            <br/>
            <input
                type="text"
                placeholder="Category Image URL"
                value={category.imgUrl}
                onChange={updateCategory('imgUrl')}
            />
            <br/>
            <button onClick={createCategoryHandler}>Create</button>
        </div>
    )
}