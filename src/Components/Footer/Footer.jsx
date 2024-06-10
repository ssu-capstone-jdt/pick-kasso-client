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
            <p>For inquiries, please contact june.shim2@gmail.com.</p>
          </div>
          <div className="info-bottom">
            <p>@ 2024 Pick카소, created by Team JDT</p>
          </div>
        </div>
      </div>
      <div className="footer-right">
        <a href="https://github.com/orgs/ssu-capstone-jdt/repositories" target="_blank" rel="noopener noreferrer">
          <img src={github_icon} alt="GitHub" className="social-icon" />
        </a>
        <a href="mailto:june.shim2@gmail.com">
          <img src={email_icon} alt="Email" className="social-icon" />
        </a>
      </div>
    </div>
  )
}

export default Footer
