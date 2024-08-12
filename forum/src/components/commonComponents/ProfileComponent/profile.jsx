import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom'; // Импортираме useParams директно тук
import { AppContext } from '../../../../state/app.context.js';
import { getUserDataByUID } from '../../../services/user.service.js';
import './profile.css'

const Profile = () => {
    const { uid } = useParams(); // Извличаме userId от URL параметрите
    const { userData } = useContext(AppContext);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        console.log("userId:", uid);
        console.log("userData:", userData);

    
        if (uid) {
            getUserDataByUID(uid)
            .then(data => {
            console.log("Fetched data:", data);
            setProfileData(Object.values(data));
            })
            .catch(error => console.error("Failed to fetch user data:", error));
            
        } else {
            setProfileData(userData);
        }
    }, [uid, userData]);

    if (!profileData) {
        return <div>Loading...</div>;
    }
    console.log(profileData);
    return (
        <div className='profile-container'>
            <div className="profile-header">
                <img src={profileData[0].avatarUrl} alt="profile-pic" />
                <div className="profile-info">
                    <h2>{profileData[0].username}</h2>
                    <h3>{profileData[0].firstName} {profileData[0].lastName}</h3>
                    <p>{profileData[0].customInfo || 'Custom information'}</p>
                </div>
                <img src={profileData[0].badgeUrl} alt="badge" />
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