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

    const posts_id = getElement(`posts/${subcategory_id}`).map(post => post.id);

    return posts_id.forEach(post => updatePost({isHidden: true, isLocked: true}, post.id))
}

export const lockPosts = async (subcategory_id) => {

    const posts_id = getElement(`posts/${subcategory_id}`).map(post => post.id);

    return posts_id.forEach(post => updatePost({isLocked: true}, post.id))

}

export const removePostsByCategoryId = async (subcategory_id) => {

    const postsIds = getElement(`posts/${subcategory_id}`).map(post => post.id);

    return postsIds.forEach(postId => deletePost(postId));

}

//missing hiding and getting post funcs
