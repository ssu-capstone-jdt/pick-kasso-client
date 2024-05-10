import React from 'react'
import './Footer.css'
import github_icon from '../Assets/github_LOGO.png'
import email_icon from '../Assets/email_ICON.png'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-center">
        <div className="footer-info">
          <div className="info-top">
            <p>info something @email.com</p>
          </div>
          <div className="info-bottom">
            <p>@ 2024 Pick카소, created by Team JDT</p>
          </div>
        </div>
      </div>
      <div className="footer-right">
        <img src={github_icon} alt="" className="social-icon"/>
        <img src={email_icon} alt="" className="social-icon"/>
      </div>
    </div>
  )
}

export default Footer
