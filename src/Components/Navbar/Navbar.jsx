import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navbar.css';

import logo from '../Assets/logo-ICON@2x.png';
import logo_icon from '../Assets/logo-text@2x.png';
import GoogleAuthButton from '../GoogleAuthButton';
import defaultUserImage from '../Assets/userImage.png'; // Import the default user image

const Navbar = ({ user, setUser }) => {
    const [menu, setMenu] = useState("home");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            setIsLoggedIn(true);
            const storedUser = JSON.parse(sessionStorage.getItem('user'));
            if (storedUser) {
                setProfileImage(storedUser.profile);
                console.log("Profile Image URL:", storedUser.profile); // Debugging
            }
        }
    }, []);

    return (
        <div className='navbar'>
            <ul className="nav-menu">
                <li>
                    <div className="nav-logo">
                        <img src={logo} alt="Logo" />
                        <img src={logo_icon} alt="Logo Icon" />
                    </div>
                </li>
                <li onClick={() => { setMenu("home") }}><Link to='/home'>홈</Link>{menu === "home" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("post") }}><Link to='/post'>포스트</Link>{menu === "post" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("curriculum") }}><Link to='/curriculum'>커리큘럼</Link>{menu === "curriculum" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mypage") }}><Link to='/mypage'>마이페이지</Link>{menu === "mypage" ? <hr /> : <></>}</li>
                <div className="nav-login">
                    {isLoggedIn ? (
                        <div className="user-image-container" onClick={() => { setMenu("user") }}>
                            <Link to="/user">
                                <img src={profileImage || defaultUserImage} alt="User" className="user-image" />
                            </Link>
                            {menu === "user" ? <hr /> : <></>}
                        </div>
                    ) : (
                        <GoogleAuthButton setUser={setUser} />
                    )}
                </div>
            </ul>
        </div>
    );
}

export default Navbar;
