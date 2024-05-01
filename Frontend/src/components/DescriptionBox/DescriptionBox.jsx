import React from 'react'
import './DescriptionBox.css'

const DescriptionBox=()=>{
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>An e-commerce websiteis an online platform that facilitates the buying and selling of products or service over
                    the internet.It serves as a virtual marketplace where individuals can showcase their products,interact with
                    customers, and conduct transactions without the need for a physical presenc.E-commerce websites have gained immemse popularity due to their convience, and the global reach they offer.
                </p>
                <p>E-commerce website typically display products or services along with detailed  descriptions, images, prices and any available variations(e.g. sizes,colors).Each product usually has its own dedicated page with relevant information.</p>
            </div>
        </div>
    )
}
export default DescriptionBox