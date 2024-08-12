import {createElement, createPath, getElement, removeElement, updateElement} from "../firebase/firebase-funcs.js";
import {hidePosts, lockPosts, removePostsByCategoryId, showPosts} from "./post.service.js";
import {editCategory} from "./category.service.js";

export const getSubcategoriesByCategoryId = async (category_id) => {

    return getElement(`Subcategory/${category_id}`)

}

export const getAllSubcategories = async () => {

        const subcategories = await getElement('Subcategory');

        return Object.values(subcategories);
}

export const createSubcategory = async (name, imgUrl, category_id) => {

    const subcategory = {
        name,
        isLocked: false,
        isHidden: false,
        imgUrl

    }

    const id = await createElement(subcategory, `Subcategory/${category_id}`);

    await editCategory({id, name}, category_id, `subcategory_ids/${id}`)

    return id;
}

export const editSubcategory = async (data, category_id, subcategory_id) => {
    
    const pathToBeEdited = createPath('Subcategory', category_id, subcategory_id)

    return updateElement(data, pathToBeEdited);

}
export const hideSubcategory = async (category_id, subcategory_id) => {

    await editSubcategory({isHidden: true, isLocked: true}, category_id, subcategory_id)

    return hidePosts(subcategory_id);

}

export const lockSubcategory = async (category_id, subcategory_id) => {

   await editSubcategory({isLocked: true}, category_id, subcategory_id)

    return lockPosts(subcategory_id);

}

export const showSubcategory = async (category_id, subcategory_id) => {

    await editSubcategory({isHidden: false, isLocked: false}, category_id, subcategory_id)

    return showPosts(subcategory_id);

}

export const unlockSubcategory = async (category_id, subcategory_id) => {

    await editSubcategory({isLocked: false}, category_id, subcategory_id)

    //todo
    return //unlockPosts(subcategory_id);

}


export const hideSubcategories = async (category_id, shouldHide = true) => {

    const subcategory_ids = await getSubcategoriesByCategoryId(category_id);

    const keys_sub_ids = Object.keys(subcategory_ids);

    if (shouldHide) {
        return keys_sub_ids.forEach(sub => hideSubcategory(category_id, sub));
    } else {
        return keys_sub_ids.forEach(sub => showSubcategory(category_id, sub));
    }
}


export const lockSubcategories = async (category_id, ...subcategoryIds) => {

    await subcategoryIds.forEach(sub => editSubcategory({isLocked: true}, `Subcategory/${category_id}/${sub.id}`));

    return lockPosts(subcategoryIds);
}

export const deleteSubcategory = async (category_id, subcategory_id) => {

    const removePath = createPath('Subcategory', category_id, subcategory_id)

    await removeElement(removePath);

    await editCategory(null, category_id, `subcategory_ids/${subcategory_id}` )

    return removePostsByCategoryId(subcategory_id);

}


export const getSubcategoryNameBySubcategoryId = async (subcategory_id) => {

    try {
        const categories = await getElement('Category');
        const category = Object.values(categories).find(category => category.subcategory_ids[subcategory_id]);
        console.log(category.subcategory_ids[subcategory_id])
        return category.subcategory_ids[subcategory_id];
    } catch (e) {
        console.error('Failed to get category id by subcategory id', e);
        return e.message;
    }
}
