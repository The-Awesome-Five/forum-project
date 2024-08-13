import React, { useState, useEffect } from 'react';
import './AboutComponent.css';

const About = () => {
    const [score, setScore] = useState(0);
    const [position, setPosition] = useState({ top: '50%', left: '50%' });


    const handleImageClick = () => {
        setScore(score + 1);
        moveImage();
    };

   
    const moveImage = () => {
        const imageSize = 50; 
        const sectionHeight = 200; 
        const sectionWidth = document.querySelector('.game-section').clientWidth;

        const maxTop = sectionHeight - imageSize;
        const maxLeft = sectionWidth - imageSize;

        const top = Math.floor(Math.random() * maxTop) + 'px';
        const left = Math.floor(Math.random() * maxLeft) + 'px';

        setPosition({ top, left });
    };


    useEffect(() => {
        const interval = setInterval(moveImage, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>Welcome to GameHub, the ultimate online community for gamers of all kinds! Whether you're a seasoned pro, a casual player, or just getting started on your gaming journey, GameHub is the place where you can connect, share, and explore the world of gaming.</p>
            <h2>Our Mission</h2>
            <p>At GameHub, our mission is to create a vibrant and inclusive community where gamers can come together to discuss the latest trends, share tips and strategies, and dive into in-depth discussions about their favorite games. We believe that gaming is more than just a hobby—it's a passion that brings people together from all corners of the world.</p>
            <h2>Meet Our Developers</h2>
            <div className="developer-section">
                <div className="developer-card">
                    <img src="../../../../public/img/vladi.png" alt="Vladimir Vladimirov" />
                    <h3>Vladimir Vladimirov</h3>
                    <p>Frontend developer</p>
                </div>
                <div className="developer-card">
                    <img src="../../../../public/img/doni.png" alt="Donetian Petkov" />
                    <h3>Donetian Petkov</h3>
                    <p>Frontend developer</p>
                </div>
                <div className="developer-card">
                    <img src="../../../../public/img/svet.png" alt="Svetoslav Berbenski" />
                    <h3>Svetoslav Berbenski</h3>
                    <p>Frontend developer</p>
                </div>
            </div>

            <h2>Mini Game: Click the Ball!</h2>
            <div className="game-section">
                <p>Score: {score}</p>
                <div
                    className="click-box"
                    style={{ top: position.top, left: position.left }}
                    onClick={handleImageClick}
                >
                    <img src="../../../../public/img/ball.png" alt="Click me!" />
                </div>
            </div>
        </div>
    );
};

export default About;