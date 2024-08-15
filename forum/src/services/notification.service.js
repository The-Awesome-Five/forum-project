import {ref} from "firebase/database";
import {db} from "../firebase/config.js";

export const getNotifications = (uid) => {
    const notifications = ref((db),`Users/${uid}/Notifications`);
    return notifications;
}
