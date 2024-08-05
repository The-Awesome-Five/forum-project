import {createElement, createPath, getElement, removeElement, updateElement} from "../firebase/firebase-funcs.js";
import {hidePosts, lockPosts, removePostsByCategoryId} from "./post.service.js";

export const getSubcategoriesByCategoryId = async (category_id) => {

    return getElement(`Subcategory/${category_id}`)

}

export const createSubcategory = async (name, category_id) => {

    const subcategory = {
        name,
        isLocked: false,
        isHidden: false

    }

    return createElement(subcategory, `Subcategory/${category_id}`)
}

export const editSubcategory = async (data, path, category_id, subcategory_id) => {

    const pathToBeEdited = createPath('Subcategory', category_id, subcategory_id)

    return updateElement(data, pathToBeEdited);

}

export const hideSubcategory = async (category_id, subcategory_id) => {

    const pathToBeHidden = createPath('Subcategory', category_id, subcategory_id);

    await updateElement({isHidden: true, isLocked: true}, pathToBeHidden );

    return hidePosts(subcategory_id);

}

export const lockSubcategory = async (category_id, subcategory_id) => {

    const pathToBeLocked = createPath('Subcategory', category_id, subcategory_id);

    await updateElement({isLocked: true}, pathToBeLocked );

    return lockPosts(subcategory_id);

}


export const hideSubcategories = async (category_id) => {

    const subcategoryIds = await getSubcategoriesByCategoryId(category_id).map(sub => sub.id);

    await subcategoryIds.forEach(sub => editSubcategory({isHidden: true, isLocked: true}, `Subcategory/${category_id}/${sub.id}`));

    return subcategoryIds.forEach(sub => hidePosts(sub.id));
}

export const lockSubcategories = async (category_id, ...subcategoryIds) => {

    await subcategoryIds.forEach(sub => editSubcategory({isLocked: true}, `Subcategory/${category_id}/${sub.id}`));

    return lockPosts(subcategoryIds);
}

export const deleteSubcategory = async (category_id, subcategory_id) => {

    const removePath = createPath('Subcategory', category_id, subcategory_id)

    await removeElement(removePath);

    return removePostsByCategoryId(category_id);

}
