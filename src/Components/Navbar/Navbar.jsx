import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

import logo from '../Assets/logo-ICON@2x.png'
import logo_icon from '../Assets/logo-text@2x.png'

const Navbar = () => {

    const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <img src={logo_icon} alt="" />
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("home")}}><Link to='/home'>홈</Link>{menu==="home"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("post")}}><Link to='/post'>포스트</Link>{menu==="post"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("curriculum")}}><Link to='/curriculum'>커리큘럼</Link>{menu==="curriculum"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mypage")}}><Link to='/mypage'>마이페이지</Link>{menu==="mypage"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login">
        <Link to='/login'><button>로그인</button></Link>
      </div>
    </div>
  )
}

export default Navbar 
