import React from "react";
import './headerBar.css'

const headerBar = () => {
    return (
        <div className="headerbar">

            <div className="logo">
                <img src="/img/GameHub-logo.png" alt="logo"/>
            </div>

            <div className="nav-links">
                 <Link to="/lastest">LASTEST</Link>
                 <Link to="/top">TOP</Link>
                 <Link to="/about">ABOUT</Link>
            </div>

            <div className="profile-icon">
                <Link to="/profile">
                    <img src="/img/profile-icon.png" alt="" />
                </Link>
            </div>

        </div>
    )
}

export default headerBar;