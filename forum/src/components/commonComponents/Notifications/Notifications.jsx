import { useContext, useEffect, useState } from 'react';
import { getNotifications } from '../../../services/notification.service';
import { AppContext } from '../../../state/app.context';
import { onValue, off, update, get } from 'firebase/database';

export const NotificationBell = () => {
    const [notifications, setNotifications] = useState({});
    const [unreadCount, setUnreadCount] = useState(0);
    const { user } = useContext(AppContext);

    useEffect(() => {
        const notifRef = getNotifications(user.uid);
        const handleDataChange = (snapshot) => {
            const data = snapshot.val() || {};
            setNotifications(data);
            const count = Object.values(data).filter(notification => !notification.read).length;
            setUnreadCount(count);
        };

    
        onValue(notifRef, handleDataChange, (error) => {
            console.error('Error with real-time listener:', error);
        });

        return () => off(notifRef, 'value', handleDataChange);
    }, [user.uid]);

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
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    return (
        <div>
            <button onClick={handleBellClick} className={`notification-bell ${unreadCount > 0 ? 'has-unread' : ''}`}>
                <span className="bell-icon">🔔</span>
                {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
            </button>
        </div>
    );
};