import { createPath } from "../firebase/firebase-funcs.js";
import { updateElement } from "../firebase/firebase-funcs";

export const reportPost = async (uid, postId, subcategoryID, categoryId) => {

    const path = createPath('Posts', subcategoryID, postId, 'reportedBy');
    await updateElement({  [uid] : true }, path);
    const path2 = createPath('Posts', subcategoryID, postId, 'category')
    await updateElement(categoryId, path2)
};

export const UpdateReport = async (uid, postId) => {

    const path = createPath('Reports', postId, 'reportedBy');
    await updateElement({  [uid] : true }, path);
};

export const removeReport = async (subcategoryId, postId) => {
    try {
       const path = createPath('Posts', subcategoryId, postId)
        await updateElement({ reportedBy: null },path);    
    } catch (error) {
        console.error("Error removing report:", error);
    }
};