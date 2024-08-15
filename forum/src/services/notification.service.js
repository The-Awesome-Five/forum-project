import { get, ref } from "firebase/database";
import { createPath } from "../firebase/firebase-funcs"
import { db } from "../firebase/config";

 const getElement = async (path) => {
    try {
        const snapshot = await get(ref(db, path));
        return snapshot;
    } catch (e) {
        console.error('Error occurred: ', e);
        throw e;
    }
}

export const getNotifications = (uid) => {
    const path = `Users/${uid}/Notifications`;
    return ref(db, path); // Return the reference, not the snapshot
}