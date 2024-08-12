import {createElement, createPath, getElement, removeElement, updateElement} from "../firebase/firebase-funcs.js";
import { ref, get, query, orderByChild, equalTo, update, OnDisconnect } from "firebase/database";
import { db } from "../firebase/config";
import { deleteReply, getReplies } from "./reply.service.js";

export const createPost = async (postInfo, subcategoriesId) => {
    const path = createPath('Posts',subcategoriesId );
    const postId = await createElement(postInfo, path);

    const pathForUserUpdate = createPath('Users', postInfo.createdBy.ID, 'Posts', postId);
    await updateElement({id: postId, subId: subcategoriesId}, pathForUserUpdate);

    return postId;
};


export const updatePost = async (postInfo, subcategory_id, postId) => {
    const path = createPath('Posts',subcategory_id, postId);
    await updateElement(postInfo, path);
};

// export const deletePost = async (subcategoryId, postId) => {
//     const path = createPath('Posts', subcategoryId, postId);
//     await removeElement(path);
// };

// added by Doni

export const getPostsByUserId = async (user_id) => {

    const postsPath = createPath('Users', user_id, 'Posts')

    return Object.values(getElement(postsPath));

}

export const hidePosts = async (subcategory_id) => {
    try {

        const posts = await getElement(`Posts/${subcategory_id}`);
        const postsToUpdate=Object.keys(posts)


        await Promise.all(postsToUpdate.map(postId => updatePost({ isHidden: true, isLocked: true }, subcategory_id, postId)));

        return 'Posts hidden successfully!';
    } catch (e) {
        console.error('Failed to hide posts', e);
        return e.message;
    }
};

export const getSubcategoriesByPostId = async(post_id) => {
    try{
        const posts = await getElement('Posts');
        const subcategories = Object.keys(posts)
       for(let key in posts) {
        let obj = posts[key]
            for(let val in obj) {
                if(val === post_id) {
                    return key;
                }
            }
       }
    }catch (e){
        console.error('Failed to fetch subcategory!', e);
        return e.message;
    }
}

export const lockPosts = async (subcategory_id) => {
    try {

        const posts = await getElement(`Posts/${subcategory_id}`);
        const postsToUpdate=Object.keys(posts)
        // posts.flat();


        await Promise.all(postsToUpdate.map(postId => updatePost({ isLocked: true }, subcategory_id, postId)));

    } catch (e) {
        console.error('Failed to lock posts', e);
        return e.message;
    }
};

export const removePostsByCategoryId = async (subcategory_id) => {
    try {

        const posts = await getElement(`Posts/${subcategory_id}`);
        const postsToUpdate=Object.keys(posts)

        await Promise.all(postsToUpdate.map(postId => deletePost(subcategory_id, postId)));

        return 'Posts removed successfully!';
    } catch (e) {
        console.error('Failed to remove posts', e);
        return e.message;
    }
};


export const getPostsBySubcategoryId = async (subcategoryId) => {
    return getElement(`Posts/${subcategoryId}`)
};
//missing hiding and getting post funcs

export const getSinglePost= async (subcategoryId, postId) =>{
    return getElement(`Posts/${subcategoryId}/${postId}`)

}

export const getAllPosts = async () => {
    try {
        const subcategoriesSnapshot = await get(ref(db, `Posts`));
        if (!subcategoriesSnapshot.exists()) {
            return {};
        }

        const allPosts = {};
        const subcategories = subcategoriesSnapshot.val();

        for (const subcategoryId in subcategories) {
            const postsSnapshot = await get(ref(db, `Posts/${subcategoryId}`));
            if (postsSnapshot.exists()) {
                const posts = {...postsSnapshot.val()};
                for (const postId in posts) {
                    allPosts[postId] = {...posts[postId], subcategoryId};
                }
            }
        }

        return allPosts;
    } catch (e) {
        console.error('Неуспешно получаване на всички постове', e);
        return e.message;
    }
};


export const likePost = (uid, postId, subcategoriesId) => {
    const updateObject = {
        [`Posts/${subcategoriesId}/${postId}/likedBy/${uid}`]: true,
        [`Users/${uid}/likedPosts/${uid}`]: true,
    };

    return update(ref(db), updateObject);
  };

  export const dislikePost = (uid, postId, subcategoriesId) => {
    const updateObject = {
      [`Posts/${subcategoriesId}/${postId}/likedBy/${uid}`]: null,
      [`Users/${uid}/likedPosts/${uid}`]: null,
    };

    return update(ref(db), updateObject);
  };


  export const deletePost = async (subcategoryId, postId) => {
    try {
        const postRef = ref(db, `Posts/${subcategoryId}/${postId}`);

        const postSnapshot = await get(postRef);
        const postData = postSnapshot.val();

        if (!postData) {
            throw new Error('Post not found');
        }

        const { likedBy, Replies } = postData;

        const updateObject = { [`Posts/${subcategoryId}/${postId}`]: null,
                                [`Users/${postData.createdBy.ID}/Posts/${postId}`]: null,
                            };



        if (likedBy) {
            Object.keys(likedBy).forEach(uid => {
                updateObject[`Users/${uid}/likedPosts/${postId}`] = null;
            });
        }

        const replies= await  getReplies(postId);
        if (Replies) {
            const replyDeletionPromises = Object.keys(replies).map(replyId => {

                const createdByUid = replies[replyId].createdBy.ID;
                getReplies(postId)
                return deleteReply(postId, replyId, subcategoryId, createdByUid);
            });
            await Promise.all(replyDeletionPromises);
        }


        await update(ref(db), updateObject);

    } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Failed to delete post');
    }
};
