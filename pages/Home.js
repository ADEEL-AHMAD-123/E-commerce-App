import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx';
import Marquee from "react-fast-marquee";
import baner1 from '../images/main-banner-1.jpg';
import baner2 from '../images/catbanner-01.jpg';
import baner3 from '../images/catbanner-02.jpg';
import baner4 from '../images/catbanner-03.jpg';
import baner5 from '../images/catbanner-04.jpg';
import service1 from '../images/service.png';
import service2 from '../images/service-02.png';
import service3 from '../images/service-03.png';
import service4 from '../images/service-04.png';
import service5 from '../images/service-05.png';
import category1 from '../images/laptop.jpg';
import category2 from '../images/camera.jpg';
import category3 from '../images/tv.jpg';
import category4 from '../images/watch.jpg';
import category5 from '../images/headphone.jpg';
import category6 from '../images/speaker.jpg';
import category7 from '../images/acc.jpg';
import category8 from '../images/homeapp.jpg';
import brand1 from '../images/brand-01.png';
import brand2 from '../images/brand-02.png';
import brand3 from '../images/brand-03.png';
import brand4 from '../images/brand-04.png';
import brand5 from '../images/brand-05.png';
import brand6 from '../images/brand-06.png';
import brand7 from '../images/brand-07.png';
import brand8 from '../images/brand-08.png';
import famous1 from '../images/watch2.png';
import '../App.scss'
import Blogs from '../components/Blogs';
import { productAsyncActions } from '../slices/productsSlice';
import ProductListing from "../components/ProductListing.jsx";
import SpecialProduct from '../components/SpecialProduct.jsx';
import Meta from '../components/Meta.jsx';
import { useSelector, useDispatch } from "react-redux";

const Home = () => {

const dispatch=useDispatch()

useEffect(() => {
  let requestData = `?limit=${25}`;
  dispatch(productAsyncActions.fetchProducts({ requestData }));
}, []);


  return (

<>
<Meta title='Home'/>
<div className="home">

{/* ------------ Hero banners section -------------- */}
<div className="wrapper-1">
<div className="left">
<section className="mainbanner">
  <img src={baner1} alt="bb" className='img' />
  <div className="baner-content">
    <h4>SUPERCHARGED FOR PROS</h4>
    <h5>ipad S13+ Pro</h5>
    <p>From $999.0 or $41.62/mo</p>
    <Link className='button'>BUY NOW</Link>
  </div>
</section>
</div>

<div className="right">
<section className="smallbanner">
  <img src={baner2} alt="bb" className='img' />
  <div className="baner-content">
    <h4>BEST SALE</h4>
    <h5>Laptop Max</h5>
    <p>From $1699.00 or<br/>$64.62/mo </p>

  </div>
</section>
<section className="smallbanner">
  <img src={baner4} alt="bb" className='img' />
  <div className="baner-content">
    <h4>NEW ARRIVALS</h4>
    <h5>Buy Ipad Air</h5>
    <p>From $599 or<br/> $49.91/mo</p>

  </div>
</section>
<section className="smallbanner">
  <img src={baner3} alt="bb" className='img' />
  <div className="baner-content">
    <h4>15% OFF</h4>
    <h5>SmartWatch 7</h5>
    <p>Shop the latest brands<br/>styles and colours.</p>

  </div>
</section>
<section className="smallbanner">
  <img src={baner5} alt="bb" className='img' />
  <div className="baner-content">
    <h4>FREE ENGRAVING</h4>
    <h5>Air Pods Max</h5>
    <p>High-fedility playback and <br/>and ultra-low distortion</p>

  </div>
</section>
</div>

</div>

{/* ------------ Services section -------------- */}
<div className="wrapper">
  <div className="services">
    <div className='service'>
      <img src={service1} alt="" />
      <div className="img-content">
<h6>Free Shiping</h6>
<p>From all orders over $5</p>
      </div> 
    </div>
    <div className='service'>
      <img src={service2} alt="" />
      <div className="img-content">
<h6>Daily Surprising Offers</h6>
<p>Save upto 25% off</p>
      </div>
    </div>
    <div className='service'>
      <img src={service3} alt="" />
      <div className="img-content">
<h6>Support 24/7</h6>
<p>Shop with an expert</p>
      </div>
    </div>
    <div className='service'>
      <img src={service4} alt="" />
      <div className="img-content">
<h6>Affordible Prices</h6>
<p>Get Factory direct prices</p>
      </div>
    </div>
    <div className='service'>
      <img src={service5} alt="" />
      <div className="img-content">
<h6>Secure Payment</h6>
<p>100% protected payments</p>
      </div>
    </div>
  </div>
</div>

{/* ------------ Categories section -------------- */}
<div className="wrapper">
  <div className="categories">
    <div className="category" >
      <div>
        <h6>Computer and Laptops</h6>
        <p>6 Items</p>
      </div>
      <div>
        <img src={category1} alt="" className='img'/>
      </div>
    </div>
    <div className="category">
      <div>
        <h6>Cameras & Videos</h6>
        <p>10 Items</p>
      </div>
      <div>
        <img src={category2} alt="" className='img'/>
      </div>
    </div>
    <div className="category">
      <div>
        <h6>Smart Televisions</h6>
        <p>10 Items</p>
      </div>
      <div>
        <img src={category3} alt="" className='img'/>
      </div>
    </div>
    <div className="category">
      <div>
        <h6>Smart Watches</h6>
        <p>13 Items</p>
      </div>
      <div>
        <img src={category3} alt="" className='img'/>
      </div>
    </div>
    <div className="category">
      <div>
        <h6>Headphones</h6>
        <p>6 Items</p>
      </div>
      <div>
        <img src={category5} alt="" className='img'/>
      </div>
    </div>
    <div className="category">
      <div>
        <h6>Portable Speakers</h6>
        <p>11 Items</p>
      </div>
      <div>
        <img src={category6} alt="" className='img'/>
      </div>
    </div>
    <div className="category">
      <div>
        <h6>Accessories</h6>
        <p>7 Items</p>
      </div>
      <div>
        <img src={category7} alt="" className='img'/>
      </div>
    </div>
    <div className="category">
      <div>
        <h6>Mobiles & Tablets</h6>
        <p>10 Items</p>
      </div>
      <div>
        <img src={category8} alt="" className='img'/>
      </div>
    </div>
    
  </div>
</div>

{/* ------------ Marque section -------------- */}
<div className="wrapper">
  <div className="marques">
  <div className= 'marque'>
  <img src={brand1} alt="not found" />
</div>
  <div className= 'marque'>
  <img src={brand2} alt="not found" />
</div>
  <div className= 'marque'>
  <img src={brand3} alt="not found" />
</div>
  <div className= 'marque'>
  <img src={brand4} alt="not found" />
</div>
  <div className= 'marque'>
  <img src={brand5} alt="not found" />
</div>
  <div className= 'marque'>
  <img src={brand6} alt="not found" />
</div>
  <div className= 'marque'>
  <img src={brand7} alt="not found" />
</div>
  <div className= 'marque'>
  <img src={brand8} alt="not found" />

  </div>
</div>
</div>

{/* ------------ Featured products collection section -------------- */}
<div className="wrapper">
  <div className="heading">
    <h3>Featured Collection</h3>
  </div>


  <ProductListing filterByFeatured={true} />


</div>

{/* ------------------- Famous section------------------------- */}
<div className="wrapper">
  <div className="famous-cards-wrapper">
    <div className="famous-products-card">
      <div className="famous-content">
      <h5>Big Screen</h5>
<h6>Smart Watch Series 7</h6>
<p>From $399 or $16.62/mo for 24 mo</p>
      </div>
      <img src={famous1} alt="" />


    </div>
    <div className="famous-products-card">
      <div className="famous-content">
      <h5>Big Screen</h5>
<h6>Smart Watch Series 7</h6>
<p>From $399 or $16.62/mo for 24 mo</p>
      </div>
      <img src={famous1} alt="" />


    </div>
    <div className="famous-products-card">
      <div className="famous-content">
      <h5>Big Screen</h5>
<h6>Smart Watch Series 7</h6>
<p>From $399 or $16.62/mo for 24 mo</p>
      </div>
      <img src={famous1} alt="" />


    </div>
    <div className="famous-products-card">
      <div className="famous-content">
      <h5>Big Screen</h5>
<h6>Smart Watch Series 7</h6>
<p>From $399 or $16.62/mo for 24 mo</p>
      </div>
      <img src={famous1} alt="" />


    </div>
  
 
  </div>
</div>



{/* ------------------- special products-------------------- */}
<div className="wrapper">
<div className="heading">
    <h3>Special Products</h3>
  </div>
  <div className="special-products">
    <SpecialProduct/>
    <SpecialProduct/>
    <SpecialProduct/>
  </div>
</div>


{/* ------------ Our popular products section -------------- */}
<div className="wrapper">
  <div className="heading">
    <h3>Our Popular Products</h3>
  </div>
  <ProductListing startIndex={5} endIndex={9} />

  <dev className='popular-products-devider'>
  {/* <div className="category-cards">
<div className="category-card"> category</div>
<div className="category-card"> category</div>
  </div> */}
  </dev>
</div>

{/* ------------ Blogs section ------------ */}
<div className="wrapper">
  <div className="heading">
    <h3>Our Latest Blogs</h3>
  </div>
  <div className="blogs">
    <Blogs/>
    <Blogs/>
    <Blogs/>
    <Blogs/>
  </div>
</div>

</div>
</>
  )
}

export default Home