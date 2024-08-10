import React from 'react';
import { Link } from 'react-router-dom';
import './profile.css'

const Profile = () => {

    return (
        <div className='profile-container'>
            <div class="profile-header">
            <img src="" alt="profile-pic" />
            <div class="profile-info">
                <h2>DEDOV</h2>
                <p>Custom information</p>
            </div>
            <img src="" alt="badge" />
        </div>
        <div class="profile-navigation">
         <Link to="/user's-topics">Yours Topics</Link>
            <Link to='/edit-profile'>Edit Profile</Link>
        </div>
        <div class="profile-section">
            <h3>Top Comments by User</h3>
            <p></p>
        </div>
        <div class="profile-section">
            <h3>Top Topics by User</h3>
            <p></p>
        </div>
        </div>
    )
}

export default Profile;