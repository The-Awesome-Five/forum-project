import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../../state/app.context';
import './profile.css';

const Profile = () => {
    const { userData } = useContext(AppContext);
    const [profileData, setProfileData] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        if (userId) {
            if(userData.id===userId){
                setProfileData(userData)
            } else {
                getUserDataByUID(userId)
                    .then(data => setProfileData(data))
                    .catch(error => console.error("Failed to fetch user data:", error));
            }
        }
    }, [userId, userData]);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='profile-container'>
            <div className="profile-header">
                <img src={profileData.avatarUrl} alt="profile-pic" />
                <div className="profile-info">
                    <h2>{profileData.username}</h2>
                    <h3>{profileData.firstName} {profileData.lastName}</h3>
                    <p>{profileData.customInfo || 'Custom information'}</p>
                </div>
                <img src={profileData.badgeUrl} alt="badge" />
            </div>
            <div className="profile-navigation">
                <Link to="/users-topics">Your Topics</Link>
                <Link to='/edit-profile'>Edit Profile</Link>
            </div>
            <div className="profile-section">
                <h3>Top Comments by User</h3>
                <p>{'No top comments available.'}</p>
            </div>
            <div className="profile-section">
                <h3>Top Topics by User</h3>
                <p>{ 'No top topics available.'}</p>
            </div>
        </div>
    )
}

export default Profile;