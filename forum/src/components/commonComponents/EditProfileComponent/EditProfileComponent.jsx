import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../../state/app.context';
import { getUserByID, updateUserAvatar } from '../../../services/user.service';

const EditProfile = () => {
    const {userData } = useContext(AppContext);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadUserData = async () => {
        if (userData) {
          try {
            const userData = await getUserByID(userData.uid);
            setAvatarUrl(userData.avatarUrl || '');
          } catch (error) {
            console.error('Failed to load user data:', error);
          }
        }
        setLoading(false);
      };
  
      loadUserData();
    }, []);
  
    const handleAvatarUrlChange = (e) => {
      setAvatarUrl(e.target.value);
    };
  
    const saveChanges = async () => {
      try {
        if (userData) {
          await updateUserAvatar(userData.uid, avatarUrl);
          alert('Avatar URL updated successfully!');
        } else {
          alert('User not found or not logged in.');
        }
      } catch (error) {
        console.error('Failed to update avatar URL:', error);
        alert('Failed to update avatar URL.');
      }
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Edit Profile</h2>
        <label>
          Avatar URL:
          <input type="text" value={avatarUrl} onChange={handleAvatarUrlChange} />
        </label>
        <br />
        <button onClick={saveChanges}>Save Changes</button>
      </div>
    );
  };
  
  export default EditProfile;