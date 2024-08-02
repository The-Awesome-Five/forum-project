import { createElement } from "../firebase/firebase-funcs"
import { createPath, getElement } from "../firebase/firebase-funcs";
import { update } from "firebase/database";

export const createCategory = async (name) => {

    const data = {
        name,
        subcategoriesId: {}
    }

    return createElement(data,'Category');
}

export const editCategory = async (prop, value, category_id) => {


    const pathToBeEdited = createPath('Category', category_id, prop)
    

    return updateElement(value, pathToBeEdited);
}

export const hideCategory = async (category_id) => {



}

export const lockUserFromCategory = async (category_id, user_id) => {

    const path = createPath('Category', category_id, 'locked_users');

    return createElement(user_id, path);

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
