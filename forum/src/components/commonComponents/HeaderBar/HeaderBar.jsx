import React, { useState } from "react";
import './HeaderBar.css';
import { Link, useNavigate } from "react-router-dom";

const HeaderBar = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleProfileClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="header-wrapper">
            
            <div className="headerbar">
                <div className="logo" onClick={handleLogoClick}>
                    <img src="/img/GameHub-logo.png" alt="logo"/>
                </div>

                <div className="nav-links">
                    <Link to="/latest">LATEST</Link>
                    <Link to="/top">TOP</Link>
                    <Link to="/about">ABOUT</Link>
                </div>

                <div className="dropdown">
                    <div className="profile-icon" onClick={handleProfileClick} tabIndex="0">
                        <img src="/img/profile-icon.png" alt="profile icon" />
                    </div>
                    <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                        <div className="reg-btn">
                            <Link to="/register">REGISTER ▶️</Link>
                        </div>
                        <div className="log-btn">
                            <Link to="/login">LOGIN       ▶️</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="banner">
                <img src="img/banner.png" alt="Banner" />
            </div>
        </div>
    );
}

export default HeaderBar;