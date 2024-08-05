import { createElement, createPath, removeElement, updateElement } from "../firebase/firebase-funcs";
import { get, ref } from "firebase/database";
import { db } from "../firebase/config";
export const createReply = async (info, postID, subcategoriesId) => {

    const path= createPath('reply', postID)
    const id= await createElement(info, path);
    const pathForUpdate=  createPath('Posts', subcategoriesId, postID, 'updatedOn')
    // post/ID/POSTID/updatedOn
    await updateElement(info.createdOn, pathForUpdate);
    const pathForUserUpdate= createPath('user', info.createdBy.username)
    await createElement (id, pathForUserUpdate);
}

export const updateReply= async (info, postID, replyID) => {

    const path = createPath('reply', postID, replyID);
    await updateElement (info, path);

}

export const deleteReply = async(postID, replyID) =>{

    const path = createPath('reply', postID, replyID);
    await removeElement(path);
}


export const getReplies = async (postID) => {
    const path = createPath ('reply', postID)
    const snapshot = await get(ref(db, path));
    if (!snapshot.exists()) return [];

    return Object.values(snapshot.val());
};
// missing get function
