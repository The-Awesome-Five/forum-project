import { createElement, createPath, removeElement, updateElement } from "../firebase/firebase-funcs.js";

export const createPost = async (postInfo, subcategoriesId) => {
    const path = createPath('posts');
    const postId = await createElement(postInfo, path);

    const pathForUpdate = createPath('Posts', subcategoriesId, postId, 'updatedOn');
    await updateElement(postInfo.createdOn, pathForUpdate);

    const pathForUserUpdate = createPath('user', postInfo.createdBy.username);
    await createElement(postId, pathForUserUpdate);

    return postId;
};

export const updatePost = async (postInfo, postId) => {
    const path = createPath('posts', postId);
    await updateElement(postInfo, path);
};

export const deletePost = async (postId) => {
    const path = createPath('posts', postId);
    await removeElement(path);
};