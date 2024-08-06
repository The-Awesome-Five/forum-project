import {createElement, createPath, getElement, removeElement, updateElement} from "../firebase/firebase-funcs.js";
import {hidePosts, lockPosts, removePostsByCategoryId} from "./post.service.js";
import {editCategory} from "./category.service.js";

export const getSubcategoriesByCategoryId = async (category_id) => {

    return getElement(`Category/${category_id}/subcategory_ids`)

}

export const createSubcategory = async (name, category_id) => {

    const subcategory = {
        name,
        isLocked: false,
        isHidden: false

    }

    const id = await createElement(subcategory, `Subcategory/${category_id}`);

    // todo

    console.log('Create Subcategory')
    await editCategory(name, category_id, `subcategory_ids/${id}`)

    return id;
}

export const editSubcategory = async (data, category_id, subcategory_id) => {

    const pathToBeEdited = createPath('Subcategory', category_id, subcategory_id)

    return updateElement(data, pathToBeEdited);

}

export const hideSubcategory = async (category_id, subcategory_id) => {

    await editSubcategory({isHidden: true, isLocked: true}, category_id, subcategory_id)

    //todo
    return hidePosts(subcategory_id);

}

export const lockSubcategory = async (category_id, subcategory_id) => {

   await editSubcategory({isLocked: true}, category_id, subcategory_id)

    //todo
    return lockPosts(subcategory_id);

}

export const unhideSubcategory = async (category_id, subcategory_id) => {

    await editSubcategory({isHidden: false, isLocked: false}, category_id, subcategory_id)

    //todo
    return  hidePosts(subcategory_id);

}

export const unlockSubcategory = async (category_id, subcategory_id) => {

    await editSubcategory({isLocked: false}, category_id, subcategory_id)

    //todo
    return lockPosts(subcategory_id);

}

//todo
export const hideSubcategories = async (category_id) => {

    const subcategory_ids = await getSubcategoriesByCategoryId(category_id);

    const keys_sub_ids = Object.keys(subcategory_ids);

    await keys_sub_ids.forEach(sub => hideSubcategory(category_id,sub));

    return keys_sub_ids.forEach(sub => hidePosts(sub.id));
}

//todo
export const lockSubcategories = async (category_id, ...subcategoryIds) => {

    await subcategoryIds.forEach(sub => editSubcategory({isLocked: true}, `Subcategory/${category_id}/${sub.id}`));

    return lockPosts(subcategoryIds);
}

//todo
export const deleteSubcategory = async (category_id, subcategory_id) => {

    const removePath = createPath('Subcategory', category_id, subcategory_id)

    await removeElement(removePath);
    await editCategory(null, category_id, `subcategory_ids/${subcategory_id}` )

    return removePostsByCategoryId(subcategory_id);

}
