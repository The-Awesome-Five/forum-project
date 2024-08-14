import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../state/app.context';
import {
    getUserByID,
    updateUserAvatar,
    updateUserFirstName,
    updateUserLastName,
    updateCustomInfo,
    updateUserRole
} from '../../../services/user.service';
import {useNavigate, useParams} from 'react-router-dom';
import './EditProfileComponent.css';
import {getPostsByUserId} from "../../../services/post.service.js";
import {toast} from "react-toastify"; // Импорт на CSS

const EditProfile = () => {
    const { userData, setAppState } = useContext(AppContext);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const isAdmin = userData && userData.role === 'Admin';

    const { uid } = useParams();

    useEffect(() => {
      const loadUserData = async () => {
        if (userData) {
          try {
            const id = uid || userData.uid;
            const userDataFromDB = await getUserByID(id);
            setUserId(id);
            setAvatarUrl(userDataFromDB.avatarUrl || '');
            setFirstName(userDataFromDB.firstName || '');
            setLastName(userDataFromDB.lastName || '');
            setInfo(userDataFromDB.info || '');
            setRole(userDataFromDB.role || '');
          } catch (error) {
            toast.error('The user could not be fetched -> ', error)
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

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }


    const saveChanges = async () => {
      try {
        if (userData) {
          await updateUserAvatar(userId, avatarUrl);
          await updateUserFirstName(userId, firstName);
          await updateUserLastName(userId, lastName);
          await updateCustomInfo(userId, info);
            console.log(role)
          await updateUserRole(userId, role);
          const updatedUserData = await getUserByID(userId);
          setAppState({ userData: updatedUserData });

          window.location.reload();
          toast.success('Profile updated successfully!');
        } else {
          toast.error('User not found or not logged in.');
        }
      } catch (error) {
        console.error('Failed to update profile:', error);
        toast.error('Failed to update profile.');
      }
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        <div className='edit-profile-wraper'>
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
                {isAdmin && <div className="form-group">
                    <label>Role:</label>
                <input type="text" value={role} onChange={handleRoleChange} />
                </div>}
                <div className="form-group">
                <label>Custom Information:</label>
                <textarea value={info} onChange={handleInfoChange} />
                </div>
                <button className="save-button" onClick={saveChanges}>Save Changes</button>
            </div>
        </div>
    );
  };

  export default EditProfile;
