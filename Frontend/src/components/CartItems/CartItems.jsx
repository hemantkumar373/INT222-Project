import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext.jsx'
import remove_icon  from '../assets/cart_cross_icon.png'
import {Link} from 'react-router-dom'


const CartItems=()=>{
    const {getTotalCartAmount,all_product,cartItems,removeFromCart}=useContext(ShopContext)
    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e)=>{
                if(cartItems[e.id]>0){
                    // console.log(e.id);
                    // console.log(e.name);
                    return   <div>
                    <div className="cartitems-format cartitems-format-main">

                        <Link to={`/product/${e.id}`}><img onClick={window.scrollTo(0,0)} src={e.image} alt="" className='carticon-product-icon' /></Link>
                        
                        {/* <img src={e.image} alt="" className='carticon-product-icon' /> */}
                        <p>{e.name}</p>
                        <p>Rs{e.new_price}</p>
                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                        <p>Rs{e.new_price * cartItems[e.id]}</p>
                        <img  className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    </div>
                    <hr />
                    </div>
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>Rs{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rs{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    )
}
export default CartItems