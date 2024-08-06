import React from "react";
import './headerBar.css'

const headerBar = () => {
    return (
        <div className="headerbar">

            <div className="logo">
                <img src="/img/GameHub-logo.png" alt="logo"/>
            </div>

            <div className="nav-links">
                 <a href="#lastest">LASTEST</a>
                 <a href="#top">TOP</a>
                 <a href="#about">ABOUT</a>
            </div>

            <div className="profile-icon">
                <a href="profile">
                    <img src="/img/profile-icon.png" alt="" />
                </a>
            </div>

        </div>
    )
}

export default headerBar;