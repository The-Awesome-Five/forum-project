import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../firebase/config';

// Fetch user by ID
export const getUserByID = async (id) => {
  const snapshot = await get(ref(db, `Users/${id}`));
  return snapshot.val();
};

// Create a new user record
export const createUserID = async (username, firstName, lastName, uid, email) => {
  const user = { username, firstName, lastName, uid, email, createdOn: new Date().toString() };
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