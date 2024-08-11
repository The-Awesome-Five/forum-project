import { createElement, createPath, getElement, removeElement, updateElement } from "../firebase/firebase-funcs.js";
import { get, ref, update } from "firebase/database";
import { db } from "../firebase/config.js";
export const createReply = async (info, postID, subcategoriesId) => {

    const path= createPath('Reply', postID)
    const id= await createElement(info, path);
    const pathForUpdate=  createPath('Posts', subcategoriesId, postID)
    
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

    const path = createPath('Reply', postID, replyID);
    await updateElement (info, path);

}
export const deleteReply = async (postID, replyID, subcategoryID) => {
    try {
 
        const replyPath = createPath('Reply', postID, replyID);
        const reply=  await getElement(replyPath);
        await removeElement(replyPath);
        console.log(reply);

        const updateObject = {
            [`Posts/${subcategoryID}/${postID}/Replies/${replyID}`]: null,
            [`Users/${reply.createdBy.ID}/Replies/${replyID}`]: null,
          };
           update(ref(db), updateObject);

    } catch (error) {
        console.error('Error deleting reply:', error);
        throw new Error('Failed to delete reply');
    }
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
  
    return update(ref(db), updateObject);
  };
  
  export const dislikeReply = (uid, postId, replyId) => {
    const updateObject = {
      [`Reply/${postId}/${replyId}/likedBy/${uid}`]: null,
      [`Users/${uid}/likedReplies/${replyId}`]: null,
    };
  
    return update(ref(db), updateObject);
  };