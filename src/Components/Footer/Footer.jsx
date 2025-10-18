import React from 'react'
import './Footer.css'
import footer_logo from '../../assets/Namelogo.png'
import user_icon from '../../assets/user_icon.svg'


const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-top">
            <div className="footer-top-left">
                <img src={footer_logo} alt="" />
                <p>I am a Full stack Developer from, Ducate Institute</p>
            </div>
            <div className="footer-top-right">

              <div className="footer-email-input">
                <img src={user_icon} alt="" />
                <input type="email" placeholder='Enter Your Email' />


              </div>

              <div className="footer-subscribe">
                Subscribe
              </div>
            </div>
        </div>
      <hr />
      <div className="footer-bottom">
        <p className="footer-bottom-left">
          Copyright © Gaurav's®. All rights reserved.
        </p>
        <div className="footer-bottom-right">
          <p>Term of Services</p>
          <p>Privacy Policy</p>
          <p>Contact with Me</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
