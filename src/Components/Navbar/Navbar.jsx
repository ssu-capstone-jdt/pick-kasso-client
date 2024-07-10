import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../api';
import './Navbar.css';

import logo from '../Assets/logo-ICON@2x.png';
import logo_icon from '../Assets/logo-text@2x.png';
import GoogleAuthButton from '../GoogleAuthButton';
import defaultUserImage from '../Assets/userImage.png';

const Navbar = ({ user, setUser }) => {
    const [menu, setMenu] = useState("home");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            api.get('/users', { headers: { Authorization: `Bearer ${accessToken}` } })
                .then(response => {
                    const userData = response.data.data;
                    if (response.data.success) {
                        sessionStorage.setItem('user', JSON.stringify(userData));
                        setUser(userData);
                        setProfileImage(userData.profile);
                        setIsLoggedIn(true);
                    } else {
                        // If success is false, initiate OAuth login
                        // handleLogin();
                    }
                })
                .catch(error => {
                    console.error("Error fetching user data: ", error);
                    // On error, also initiate OAuth login
                    // handleLogin();
                });
        }
    }, [setUser]);

    const handleLogin = () => {
        window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=914974225921-qkl53ra0h3nfotk5nsusarb8gh0c68vj.apps.googleusercontent.com&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive&access_type=offline&service=lso&o2v=2&ddm=0&flowName=GeneralOAuthFlow';
    };

    return (
        <div className='navbar'>
            <ul className="nav-menu">
                <li>
                    <div className="nav-logo">
                        <img src={logo} alt="Logo" />
                        <img src={logo_icon} alt="Logo Icon" />
                    </div>
                </li>
                <div className="nav-menu-list">
                <li onClick={() => { setMenu("home") }} style={{ whiteSpace: 'nowrap' }}><Link to='/home'>홈</Link>{menu === "home" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("post") }} style={{ whiteSpace: 'nowrap' }}><Link to='/post'>포스트</Link>{menu === "post" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("curriculum") }} style={{ whiteSpace: 'nowrap' }}><Link to='/curriculum'>커리큘럼</Link>{menu === "curriculum" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("keyword") }} style={{ whiteSpace: 'nowrap' }}><Link to='/keyword'>키워드</Link>{menu === "keyword" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mypage") }} style={{ whiteSpace: 'nowrap' }}><Link to='/mypage'>마이페이지</Link>{menu === "mypage" ? <hr /> : <></>}</li>
                </div>
                <div className="nav-login">
                    {isLoggedIn ? (
                        <div className="user-image-container" onClick={() => { setMenu("user") }}>
                            <Link to="/user">
                                <img src={profileImage || defaultUserImage} alt="User" className="user-image" />
                            </Link>
                            {menu === "user" ? <hr /> : <></>}
                        </div>
                    ) : (
                        <GoogleAuthButton handleLogin={handleLogin} />
                    )}
                </div>
            </ul>
        </div>
    );
}

export default Navbar;
