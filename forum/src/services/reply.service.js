import { createElement, createPath, removeElement, updateElement } from "../firebase/firebase-funcs.js";
import { get, ref } from "firebase/database";
import { db } from "../firebase/config.js";
export const createReply = async (info, postID, subcategoriesId) => {

    const path= createPath('Reply', postID)
    const id= await createElement(info, path);
    const pathForUpdate=  createPath('Posts', subcategoriesId, postID,)
    console.log(pathForUpdate);
    
    await updateElement({'updatedOn':info.createdOn }, pathForUpdate);
    const pathForUserUpdate= createPath('User', info.createdBy.username)
    await createElement (id, pathForUserUpdate);
    return id;
}

export const updateReply= async (info, postID, replyID) => {
    console.log('I am here');
    console.log(info);

    const path = createPath('Reply', postID, replyID);
    await updateElement (info, path);

}

export const deleteReply = async(postID, replyID) =>{

    const path = createPath('Reply', postID, replyID);
    await removeElement(path);
}


export const getReplies = async (postID) => {
    const path = createPath ('reply', postID)
    const snapshot = await get(ref(db, path));
    if (!snapshot.exists()) return [];

    return Object.values(snapshot.val());
};
// missing get function
