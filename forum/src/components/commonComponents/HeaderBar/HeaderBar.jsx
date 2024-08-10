import React, { useState, useEffect } from "react";
import './HeaderBar.css';
import { Link, useNavigate } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/config.js";
import { getUserByID } from "../../../services/user.service.js";

export const HeaderBar = ({ logout }) => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user] = useAuthState(auth);
    const [avatarUrl, setAvatarUrl] = useState(null);

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleProfileClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Fetch the user's avatar URL when the component mounts or when the user changes
    useEffect(() => {
        const fetchUserAvatar = async () => {
            if (user) {
                try {
                    const userData = await getUserByID(user.uid);
                    setAvatarUrl(userData.avatarUrl || null);
                } catch (error) {
                    console.error('Failed to load user avatar:', error);
                }
            }
        };

        fetchUserAvatar();
    }, [user]);

    return (
        <div className="header-wrapper">
            <div className="headerbar">
                <div className="logo" onClick={handleLogoClick}>
                    <img src="/img/GameHub-logo.png" alt="logo"/>
                </div>

                <div className="nav-links">
                    <Link to="/latest">LASTEST</Link>
                    <Link to="/top">TOP</Link>
                    <Link to="/about">ABOUT</Link>
                </div>

                <div className="dropdown">
                    <div className="profile-icon" onClick={handleProfileClick} tabIndex="0">
                        {user && avatarUrl ? (
                            <img src={avatarUrl} alt="User Avatar" className="user-avatar" />
                        ) : (
                            <img src="/img/profile-icon.png" alt="profile icon" />
                        )}
                    </div>
                    <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                        {!user ? (
                            <>
                                <div className="reg-btn">
                                    <Link to="/register">REGISTER ▶️</Link>
                                </div>
                                <div className="log-btn">
                                    <Link to="/login">LOGIN ▶️</Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="profile-btn">
                                    <Link to="/profile">PROFILE ▶️</Link>
                                </div>
                                <button onClick={() => logout()}>LOGOUT ▶️</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="banner">
                <img src="img/banner.png" alt="Banner" />
            </div>
        </div>
    );
}


