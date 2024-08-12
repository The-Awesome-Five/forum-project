import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { auth } from './config.js';
import { ref, push, get, set, update, remove, query, equalTo, orderByChild, orderByKey } from 'firebase/database';
import { db } from './config.js';

export const createElement = async (data, pathForCreating) => {
        let id;
        try {
        const result = await push(ref(db, pathForCreating), data);
        id = result.key;
       await update(ref(db), {
            [`${pathForCreating}/${id}/id`]: id,
        });

       return id;

        }
        catch(e){
            alert(e.message);
        }

}

export const updateElement = async (data, pathForUpdate) => {
    try {
        // Create a reference to the path where you want to update data
        const dataRef = ref(db, pathForUpdate);

        // Perform the update with the provided data
        await update(dataRef, data);

        return 'Element edited successfully!';
    } catch (e) {
        console.error('Update failed', e);
        return e.message;
    }
}

export const updateField = async (data, pathForUpdate) => {
    try {
        const updateObject = {
            [`${pathForUpdate}`]: data,
        };
        await update(ref(db), updateObject);

        return 'Element edited successfully!'
    }
    catch(e){
        return e;
    }

}


export const createPath = (...elements) => {
    const result = elements.reduce((acc,current) =>{
        return acc+'/' +current;
    }, )
    return result+'/';
}

export const getElement =async (pathing) =>{
    try {
        const snapshot = await get(ref(db, `${pathing}`));

        return snapshot.val();
    } catch (e) {
        return 'Error occurred: ' + e;
    }

}

export const removeElement = async (pathing) => {
    try {
        await remove(ref(db, `${pathing}`));
        return 'Element delete successfully!'
    } catch (e) {
        return 'Error occurred: ' + e;
    }
}

export const DONOTTOUCHTHISFUNCTION = async () =>{

    await remove(ref(db));
}

export const getUserPosts = async (userId) => {
    try {
        const userPostsPath = createPath('Users', userId, 'Posts');
        const postIds = await getElement(userPostsPath);
        if (!postIds) {
            return [];
        }

        const postPromises = Object.values(postIds).map(async (postId) => {
            const postPath = createPath('Posts', postId.subId,postId.id);
            const post = await getElement(postPath);
            return post ;
        });


        return  Promise.all( postPromises);
    } catch (e) {
        console.error('Failed to get user posts', e);
        return [];
    }
};

/*export const registerUser = (email, password) => {
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
};*/

// DONOTTOUCHTHISFUNCTION();
