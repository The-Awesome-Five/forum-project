import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../../state/app.context.js";
import {getNotifications} from "../../../services/notification.service.js";
import {onValue, off, get, update} from "firebase/database";
export const Notification = () => {

    const [ notifications, setNotifications ] = useState({});
    const [ unreadNotifications, setUnreadNotifications ] = useState(0);
    const { user } = useContext(AppContext);

    useEffect(() => {

        const not_ref = getNotifications(user.uid);
        const dataChange = (snapshot) => {
            const data = snapshot.val();
            setNotifications(data);
            setUnreadNotifications(Object.values(data).filter(n => !n.read).length);
        }
        onValue(not_ref, dataChange, (error) => console.log(error));

        return () => {
            off(not_ref, "value", dataChange)
        }

    }, [user.uid])

    const handleBellClick = async () => {

        try {

            const notifRef = getNotifications(user.uid);

            const snapshot = await get(notifRef);
            const data = snapshot.val() || {};
            const updates = {};

            Object.keys(data).forEach(notificationId => {
                const notification = data[notificationId];
                if (!notification.read) {
                    updates[notificationId] = { ...notification, read: true };
                }
            });

            if (Object.keys(updates).length > 0) {
                await update(notifRef, updates);
                console.log('Notifications marked as read successfully');
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <button onClick={handleBellClick} className={`notification-bell ${unreadNotifications > 0 ? 'has-unread' : ''}`}>
                <span className="bell-icon">🔔</span>
                {unreadNotifications > 0 && <span className="notification-count">{unreadNotifications}</span>}
            </button>
        </div>
    );
}
