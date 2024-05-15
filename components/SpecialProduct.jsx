import React from 'react';
import '../App.scss';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import p1 from '../images/watch.jpg';
import ProgressBar from "@ramonak/react-progress-bar";
const SpecialProduct = () => {
  return (
    <div className='special-product-card'>
<div className="special-product">
    <div className="image-box">
        <img src={p1} alt="" />
    </div>
    <dev className="special-product-content">
        <h5 className="brand">Havels</h5>
        <h6 className="title">
            Samsung Galaxy Note10+ Mobile Phone; sim...
        </h6>
        <ReactStars
    count={5}
    // onChange={ratingChanged}
    size={14}
    activeColor="#ffd700"
    value={3.3}
    edit={false}
    half={true} 
    
  />
  <p className="price">
    <span>$1000</span> &nbsp; <strike>$200</strike> 
  </p>
  <div className="discount">
   <p> <b>5 <span>Days</span></b>
   </p>
   <div className='dev'>
    <span>01</span>:
    <span>01</span>:
    <span>01</span>
   </div>

  </div>
  <div className="product-count">
    <p>Products: 38</p>
  <ProgressBar completed={38} bgColor="#2AB64F" height='8px' isLabelVisible={false} />
  </div>
  <Link className='button'>OPTION</Link>
    </dev>
</div>
    </div>
  )
}

export default SpecialProduct