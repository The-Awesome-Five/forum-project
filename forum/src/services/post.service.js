import {createElement, createPath, getElement, removeElement, updateElement} from "../firebase/firebase-funcs.js";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { db } from "../firebase/config"; 

export const createPost = async (postInfo, subcategoriesId) => {
    const path = createPath('Posts',subcategoriesId );
    const postId = await createElement(postInfo, path);

    const pathForUserUpdate = createPath('Users', postInfo.createdBy.ID, 'Posts', postId);
    console.log('this is post: ' + postId)
    await updateElement({id: postId, subId: subcategoriesId}, pathForUserUpdate);

    return postId;
};


export const updatePost = async (postInfo, subcategory_id, postId) => {
    const path = createPath('Posts',subcategory_id, postId);
    await updateElement(postInfo, path);
};

export const deletePost = async (subcategoryId, postId) => {
    const path = createPath('Posts', subcategoryId, postId);
    await removeElement(path);
};

// added by Doni

export const hidePosts = async (subcategory_id) => {
    try {
       
        const posts = await getElement(`Posts/${subcategory_id}`);
        const postsToUpdate=Object.keys(posts)

 
        await Promise.all(postsToUpdate.map(postId => updatePost({ isHidden: true, isLocked: true }, subcategory_id, postId)));

        return 'Posts hidden successfully!';
    } catch (e) {
        console.error('Failed to hide posts', e);
        return e.message;
    }
};

export const lockPosts = async (subcategory_id) => {
    try {
      
        const posts = await getElement(`Posts/${subcategory_id}`);
        const postsToUpdate=Object.keys(posts)
        // posts.flat();

        
        await Promise.all(postsToUpdate.map(postId => updatePost({ isLocked: true }, subcategory_id, postId)));

        console.log( 'Posts locked successfully!');
    } catch (e) {
        console.error('Failed to lock posts', e);
        return e.message;
    }
};

export const removePostsByCategoryId = async (subcategory_id) => {
    try {
       
        const posts = await getElement(`Posts/${subcategory_id}`);
        const postsToUpdate=Object.keys(posts)

        await Promise.all(postsToUpdate.map(postId => deletePost(subcategory_id, postId)));

        return 'Posts removed successfully!';
    } catch (e) {
        console.error('Failed to remove posts', e);
        return e.message;
    }
};


export const getPostsBySubcategoryId = async (subcategoryId) => {
    return getElement(`Posts/${subcategoryId}`)
};
//missing hiding and getting post funcs


export const getAllPosts = async () => {
    try {
        const subcategoriesSnapshot = await get(ref(db, `Posts`));
        if (!subcategoriesSnapshot.exists()) {
            console.log('Няма намерени подкатегории.');
            return {};
        }

        const allPosts = {};
        const subcategories = subcategoriesSnapshot.val();
        
        for (const subcategoryId in subcategories) {
            const postsSnapshot = await get(ref(db, `Posts/${subcategoryId}`));
            if (postsSnapshot.exists()) {
                const posts = postsSnapshot.val();
                for (const postId in posts) {
                    allPosts[postId] = posts[postId];
                }
            }
        }

        return allPosts;
    } catch (e) {
        console.error('Неуспешно получаване на всички постове', e);
        return e.message;
    }
};