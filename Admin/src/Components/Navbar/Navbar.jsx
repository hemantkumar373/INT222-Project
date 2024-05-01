import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo copy.png'
import navProfile from'../../assets/nav-profile.svg'

const Navbar=()=>{
  return(
    <div className='navbar'>
        <img src={navlogo} alt="not" className="nav-logo" /><p>Admin Panel</p>
        <img src={navProfile} alt="not" className="nav-profile" />
    </div>
  )
} 

export default Navbar