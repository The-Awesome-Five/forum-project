import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../firebase/config';
import {createPath, updateElement, getElement, updateField} from '../firebase/firebase-funcs';
import { useEffect } from 'react';

// Fetch user by ID
export const getUserByID = async (id) => {
  const snapshot = await get(ref(db, `Users/${id}`));
  return snapshot.val();
};

// Create a new user record
export const createUserID = async (username, firstName, lastName, uid, email, avatarUrl, role='User') => {
  const user = { username, firstName, lastName, uid, email, avatarUrl, role, createdOn: new Date().toString() };
  await set(ref(db, `Users/${uid}`), user);
};

// Fetch user data by UID
export const getUserDataByUID = async (uid) => {
  const snapshot = await get(query(ref(db, 'Users'), orderByChild('uid'), equalTo(uid)));
  return snapshot.val();
};

// Fetch user data by email
export const getUserDataByEmail = async (email) => {
  const snapshot = await get(query(ref(db, 'Users'), orderByChild('email'), equalTo(email)));
  return snapshot.val();
};

export const updateUserAvatar = async (uid, avatarUrl) => {
  const userRef = ref(db, `Users/${uid}/avatarUrl`);
  await set(userRef, avatarUrl);
};


export const getUserAvatar = async (subcategoryId, postId) => {
  const post = await getElement(`Posts/${subcategoryId}/${postId}`);
  if (!post) return null;

  const user = await getElement(`Users/${post.createdBy.ID}`);
  return {
      ...post,
      createdBy: {
          ...post.createdBy,
          avatarUrl: user.avatarUrl,  // Увери се, че вземаш avatarUrl от профила на потребителя
          firstName: user.firstName,   // Ако е нужно, вземи и други данни
          lastName: user.lastName,
      },
  };
};

export const getAllUsers = async () => {

  const users = await getElement('Users');

  return Object.values(users)

}

export const updateUser = async (user_id, value, prop) => {

  const pathToBeEdited = createPath('Users', user_id, prop);

  return updateField(value, pathToBeEdited)

}

export const updateUserFirstName = async (uid, firstName) => {
  const updatePath = `Users/${uid}`
  const data = { firstName: firstName};
  const result = await updateElement(data, updatePath)
  return result;
}

export const updateUserLastName = async (uid, lastName) => {
  const updatePath = `Users/${uid}`
  const data = { lastName: lastName};
  const result = await updateElement(data, updatePath)
  return result;
}

export const updateCustomInfo = async (uid, info) => {
  const updatePath = `Users/${uid}`
  const data = { customInfo: info};
  const result = await updateElement(data, updatePath)
  return result;
}

export const updateUsersPostWithSubCat= async (subcategory_id, userID, postId) => {
  const info = {
    subID: subcategory_id,
  }
  const path = createPath('Users', userID, 'Posts', postId);
  await updateElement(info, path);
}

export const changeUserRole = async (role, userId) => {

  return set(ref(db), `Users/${userId}/role`, role);
}
