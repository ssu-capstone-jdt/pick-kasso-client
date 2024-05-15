import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import logo from '../Assets/logo-ICON@2x.png';
import logo_icon from '../Assets/logo-text@2x.png';
import GoogleAuthButton from '../GoogleAuthButton';

const Navbar = ({ user, setUser }) => {
    const [menu, setMenu] = useState("home");

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
                    {user ? (
                        <div>
                            <img src={user.profile_link} alt={user.nickname} style={{ borderRadius: '100%', width: '20px' }} />
                            {/* <span style={{ marginLeft: '10px' }}>{user.nickname}</span> */}
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
