import React from 'react'
import './Footer.css'
import footer_logo from '../assets/logo.png'
import instagram_icon from '../assets/instagram_icon.png'
import Pintester_icon from '../assets/pintester_icon.png'
import Whatsapp_icon from '../assets/whatsapp_icon.png'

const Footer=()=>{
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt=""/>
                <p>Sk Traders</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={Pintester_icon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={Whatsapp_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved </p>
            </div>
        </div>
        //<h1>hello world</h1>
    )
}
export default Footer