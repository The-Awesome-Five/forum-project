import { createElement, createPath, getElement, removeElement, updateElement } from "../firebase/firebase-funcs.js";
import { get, ref, update } from "firebase/database";
import { db } from "../firebase/config.js";
export const createReply = async (info, postID, subcategoriesId) => {

    const path= createPath('Reply', postID)
    const id= await createElement(info, path);
    const pathForUpdate=  createPath('Posts', subcategoriesId, postID)
    console.log(pathForUpdate);
    
    await updateElement({'updatedOn':info.CreatedOn }, pathForUpdate);
    const updateObject = {
        [`Posts/${subcategoriesId}/${postID}/Replies/${id}`]: true,
    };
  
    await update(ref(db), updateObject);
    
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
    return getElement(`Reply/${postID}`)
};
// missing get function

export const likeReply = (uid, postId, replyId) => {
    const updateObject = {
        [`Reply/${postId}/${replyId}/likedBy/${uid}`]: true,
        [`Users/${uid}/likedReplies/${replyId}`]: true,
    };
    console.log(updateObject)
  
    return update(ref(db), updateObject);
  };
  
  export const dislikeReply = (uid, postId, replyId) => {
    const updateObject = {
      [`Reply/${postId}/${replyId}/likedBy/${uid}`]: null,
      [`Users/${uid}/likedReplies/${replyId}`]: null,
    };
  
    return update(ref(db), updateObject);
  };