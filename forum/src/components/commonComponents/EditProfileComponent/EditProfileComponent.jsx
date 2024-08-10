import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../../state/app.context';
import { getUserByID, updateUserAvatar, updateUserFirstName, updateUserLastName } from '../../../services/user.service';
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
    const { userData, setAppState } = useContext(AppContext);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadUserData = async () => {
        if (userData) {
          try {
            const userDataFromDB = await getUserByID(userData.uid);
            setAvatarUrl(userDataFromDB.avatarUrl || '');
            setFirstName(userDataFromDB.firstName || '');
            setLastName(userDataFromDB.lastName || '');
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
  
    const saveChanges = async () => {
      try {
        if (userData) {
          await updateUserAvatar(userData.uid, avatarUrl);
          await updateUserFirstName(userData.uid, firstName);
          await updateUserLastName(userData.uid, lastName);
  
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
      <div>
        <h2>Edit Profile</h2>
        <label>
          Avatar URL:
          <input type="text" value={avatarUrl} onChange={handleAvatarUrlChange} />
        </label>
        <br />
        <label>
          First Name:
          <input type="text" value={firstName} onChange={handleFirstNameChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </label>
        <br />
        <button onClick={saveChanges}>Save Changes</button>
      </div>
    );
  };
  
  export default EditProfile;