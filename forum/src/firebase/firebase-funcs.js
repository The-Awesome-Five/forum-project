import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey } from 'firebase/database';
import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
    return signOut(auth);
};

export const createTask = async (handle, {name, due, isDone}) => {
    const task = { name, due, isDone, createdOn: new Date().toString() };
    const result = await push(ref(db, `tasks/${handle}`), task);
    const id = result.key;
    await update(ref(db), {
        [`tasks/${handle}/${id}/id`]: id,
    });
};

export const getAllTasks = async (handle = '') => {
    const snapshot = await get(ref(db, `tasks/${handle}`));
    if (!snapshot.exists()) return [];

   return Object.values(snapshot.val());
};

export const getTaskByHandle = async (handle, taskId) => {
    const snapshot = await get(ref(db, `tasks/${handle}/${taskId}`));
    if (!snapshot.exists()) {
        throw new Error('Task not found!');
    }

    return {
        ...snapshot.val(),
    };
};

export const editTask = (handle, taskId, prop, newValue) => {
    const updateObject = {
        [`tasks/${handle}/${taskId}/${prop}`]: newValue,
    };

    return update(ref(db), updateObject);
};

export const editWholeTask = (handle, taskId, task) => {
    const updateObject = {
        [`tasks/${handle}/${taskId}`]: task,
    };

    return update(ref(db), updateObject);
};

export const getUserByHandle = async (handle) => {
    const snapshot = await get(ref(db, `users/${handle}`));
    return snapshot.val();
};

export const createUserHandle = async (handle, uid, email) => {
    const user = { handle, uid, email, createdOn: new Date().toString() };
    await set(ref(db, `users/${handle}`), user);
};

export const getUserData = async (uid) => {
    const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
    return snapshot.val();
};
