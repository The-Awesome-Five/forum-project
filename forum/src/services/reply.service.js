export const createReply = async (info, postID, subcategoriesId) => {

    const path= createPath('reply', postID)
    const id= await createElement(info, path);
    const pathForUpdate=  createPath('Posts', subcategoriesId, postID, 'replyID', id)
    // post/ID/POSTID/replyID
    await updateElement(true, pathForUpdate);
    const pathForUserUpdate= createPath('User', info.CreatedBy.username)
}
