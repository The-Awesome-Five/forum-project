import {createElement, createPath, getElement, removeElement, updateElement} from "../firebase/firebase-funcs.js";

export const createPost = async (postInfo, subcategoriesId) => {
    const path = createPath('Posts',subcategoriesId );
    const postId = await createElement(postInfo, path);

    const pathForUserUpdate = createPath('user', postInfo.createdBy.username);
    console.log('this is post: ' + postId)
    await createElement(postId, pathForUserUpdate);

    return postId;
};


export const updatePost = async (postInfo, subcategory_id, postId) => {
    const path = createPath('Posts',subcategory_id, postId);
    await updateElement(postInfo, path);
};

export const deletePost = async (postId) => {
    const path = createPath('Posts', postId);
    await removeElement(path);
};

// added by Doni

export const hidePosts = async (subcategory_id) => {
    try {
       
        const posts = await getElement(`Posts/${subcategory_id}`);
        const posts_id = posts.map(post => post.id);

 
        await Promise.all(posts_id.map(postId => updatePost({ isHidden: true, isLocked: true }, postId)));

        return 'Posts hidden successfully!';
    } catch (e) {
        console.error('Failed to hide posts', e);
        return e.message;
    }
};

export const lockPosts = async (subcategory_id) => {
    try {
      
        const posts = await getElement(`Posts/${subcategory_id}`);
        console.log(posts);
        posts.flat();
        const posts_id = posts.map(post => post.id);

        
        await Promise.all(posts_id.map(postId => updatePost({ isLocked: true }, postId)));

        return 'Posts locked successfully!';
    } catch (e) {
        console.error('Failed to lock posts', e);
        return e.message;
    }
};

export const removePostsByCategoryId = async (subcategory_id) => {
    try {
       
        const posts = await getElement(`Posts/${subcategory_id}`);
        const postsIds = posts.map(post => post.id);

        await Promise.all(postsIds.map(postId => deletePost(postId)));

        return 'Posts removed successfully!';
    } catch (e) {
        console.error('Failed to remove posts', e);
        return e.message;
    }
};

//missing hiding and getting post funcs
