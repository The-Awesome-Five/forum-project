import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../../state/app.context';
import { getUserByID, updateUserAvatar, updateUserFirstName, updateUserLastName, updateCustomInfo } from '../../../services/user.service';
import { useNavigate } from 'react-router-dom';
import './EditProfileComponent.css'; // Импорт на CSS

const EditProfile = () => {
    const { userData, setAppState } = useContext(AppContext);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadUserData = async () => {
        if (userData) {
          try {
            const userDataFromDB = await getUserByID(userData.uid);
            setAvatarUrl(userDataFromDB.avatarUrl || '');
            setFirstName(userDataFromDB.firstName || '');
            setLastName(userDataFromDB.lastName || '');
            setInfo(userDataFromDB.info || '');
          } catch (error) {
            console.error('Failed to load user data:', error);
          }
        }
        setLoading(false);
      };
  
      loadUserData();
    }, [userData]);
  
    const handleAvatarUrlChange = (e) => {
      setAvatarUrl(e.target.value);
    };
  
    const handleFirstNameChange = (e) => {
      setFirstName(e.target.value);
    };
  
    const handleLastNameChange = (e) => {
      setLastName(e.target.value);
    };

    const handleInfoChange = (e) => {
        setInfo(e.target.value);
      };
    
  
    const saveChanges = async () => {
      try {
        if (userData) {
          await updateUserAvatar(userData.uid, avatarUrl);
          await updateUserFirstName(userData.uid, firstName);
          await updateUserLastName(userData.uid, lastName);
          await updateCustomInfo(userData.uid, info);
          const updatedUserData = await getUserByID(userData.uid);
          setAppState({ userData: updatedUserData });
  
          window.location.reload();
          alert('Profile updated successfully!');
        } else {
          alert('User not found or not logged in.');
        }
      } catch (error) {
        console.error('Failed to update profile:', error);
        alert('Failed to update profile.');
      }
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label>Avatar URL:</label>
          <input type="text" value={avatarUrl} onChange={handleAvatarUrlChange} />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div className="form-group">
          <label>Custom Information:</label>
          <textarea value={info} onChange={handleInfoChange} />
        </div>
        <button className="save-button" onClick={saveChanges}>Save Changes</button>
      </div>
    );
  };
  
  export default EditProfile;