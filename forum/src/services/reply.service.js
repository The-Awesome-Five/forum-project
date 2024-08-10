import { createElement, createPath, removeElement, updateElement } from "../firebase/firebase-funcs.js";
import { get, ref } from "firebase/database";
import { db } from "../firebase/config.js";
export const createReply = async (info, postID, subcategoriesId) => {

    const path= createPath('Reply', postID)
    const id= await createElement(info, path);
    const pathForUpdate=  createPath('Posts', subcategoriesId, postID,)
    console.log(pathForUpdate);
    
    const test =await updateElement({'updatedOn':info.CreatedOn }, pathForUpdate);
    console.log(test);
    const pathForUserUpdate= createPath('Users', info.createdBy.ID, 'Replies', id)
    await updateElement ({replyId: id, postId: postID}, pathForUserUpdate);
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
