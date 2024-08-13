import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../../../state/app.context.js';
import { getUserDataByUID } from '../../../services/user.service.js';
import { getTopLikedPostsByUser } from '../../../services/post.service.js';
import './profile.css';

const Profile = () => {
    const { uid } = useParams();
    const { userData } = useContext(AppContext);
    const [profileData, setProfileData] = useState(null);
    const [topLikedPosts, setTopLikedPosts] = useState([]);

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

            getTopLikedPostsByUser(uid)
            .then(posts => {
                setTopLikedPosts(posts);
            })
            .catch(error => console.error("Failed to fetch top liked posts:", error));
        } else {
            setProfileData(Object.values(userData));
        }
    }, [uid, userData]);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    const isCurrentUserProfile = userData && uid === userData.uid;

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
                <Link to={`/users-topics/${uid}`}>User's Topics</Link>
                {isCurrentUserProfile && (
                    <Link to='/edit-profile'>Edit Profile</Link>
                )}
            </div>
            <div className="profile-section">
                <h3>Top Comments by User</h3>
                <p>{'No top comments available.'}</p>
            </div>
            <div className="profile-section">
                <h3>Top Topics by User</h3>
                {topLikedPosts.length > 0 ? (
                    <ul>
                        {topLikedPosts.map((post, index) => (
                            <li key={post.postId}>
                                <Link to={`/category/${post.category}/${post.subcategoryId}/${post.postId}`}>
                                    {post.Title || `Post ${index + 1}`}
                                </Link>
                                <span> - {post.likedBy ? Object.keys(post.likedBy).length : 0} likes</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No top topics available.</p>
                )}
            </div>
        </div>
    );
}

export default Profile;

