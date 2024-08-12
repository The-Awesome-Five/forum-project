import {createElement, getElement, updateElement, updateField} from "../firebase/firebase-funcs.js"
import { createPath } from "../firebase/firebase-funcs.js";
import {hideSubcategories} from "./subcategory.service.js";
import {update} from "firebase/database";

export const getAllCategories = async () => {

    const categories = await getElement('Category');

    return Object.values(categories);
}

export const createCategory = async ({name, imgUrl, description}) => {

    const data = {
        name,
        description,
        subcategories_ids: {},
        isHidden: false,
        imgUrl
    }

    return createElement(data,'Category');
}

export const editCategory = async (data, category_id, prop = '') => {

    let pathToBeEdited = createPath('Category', category_id);

    if (prop) {
        pathToBeEdited = createPath(pathToBeEdited, prop)
    }

    return updateField(data, pathToBeEdited);
}

export const editWholeCategory = async (data, category_id) => {

        return updateElement(data, `Category/${category_id}`);
}

export const hideCategory = async (category_id) => {

    await editCategory(true, category_id, 'isHidden');

    return hideSubcategories(category_id);

}

export const showCategory = async (category_id) => {

        await editCategory(false, category_id, 'isHidden');

        return hideSubcategories(category_id, false);
}

export const lockUserFromCategory = async (category_id, user_id, username) => {

    return editCategory(username, category_id, `locked_users/${user_id}`);

}

export const getCategoryIdBySubcategoryId = async (subcategory_id) => {

    try {
        const categories = await getElement('Category');
        const category = Object.values(categories).find(category => category.subcategory_ids[subcategory_id]);
        return category.id;
    } catch (e) {
        console.error('Failed to get category id by subcategory id', e);
        return e.message;
    }
}

export const getCategoryNameBySubcategoryId = async (subcategory_id) => {

    try {
        const categories = await getElement('Category');
        const category = Object.values(categories).find(category => category.subcategory_ids[subcategory_id]);
        return category;
    } catch (e) {
        console.error('Failed to get category id by subcategory id', e);
        return e.message;
    }
}


/// Category, Subcategory Pages - isHidden && !isAdmin = hidden

// administrator - reports, user management, create, edit and delete categories, create, edit and delete subcategories, lock, delete and hide posts, hide and delete replies

// moderator - lock users from category, create, edit and delete subcategories, lock, delete and hide posts, hide and delete replies

// user - create, edit and delete posts, create, edit and delete replies

// when we delete post / reply made by user, we delete the post / reply and the user's post / reply ids are updated
// only when the user tries to access them

// category state - active, deleted or hidden
// delete - delete everything - not recommended (optional)
// hide - hide and lock everything - isHidden == true

// subcategory state - active, locked, deleted or hidden
// lock - lock creating posts and replying to them
// delete - delete subcategory, posts and replies
// hide - hide subcategory and posts - isHidden === true

// posts - active, locked, deleted or hidden
// lock - lock creating replies
// delete - delete post and replies
// hide - hide post - isHidden === true

// reply - delete
// delete - delete reply
