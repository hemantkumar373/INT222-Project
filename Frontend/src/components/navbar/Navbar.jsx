import React, { useContext, useRef, useState } from 'react' ;
import './navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import dropdown_icon from '../assets/dropdown_icon.png';
// import shop from '../../pages/Shop';

 export const Navbar=()=>{
    const [menu,setMenu]=useState("shop");
    const {getTotalCartItems}=useContext(ShopContext);
    const menuRef=useRef();

    const drop_toggle=(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');

    }
    return(
        <div className='navbar'>
            <div className='nav-logo'ref={menuRef}>
                <a href="/"><img src={logo} alt=""/></a>
                {/* <p>SK Traders</p> */}
            </div>
            <img className='dropdown-icon' onClick={drop_toggle} src={dropdown_icon} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={()=>{setMenu("Home")}}><Link  style={{ textDecoration:'none'}} to='/'>Home</Link>{menu==="Home"?<hr/>:<></>}</li>
            </ul>
            <div className='nav-login-cart'>
            {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>  
            :   <Link to='/login'><button>Login</button></Link>  }  
           
              <Link to='cart'><img src={cart_icon} alt="" /></Link>  
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    )
}
// export default navbar;