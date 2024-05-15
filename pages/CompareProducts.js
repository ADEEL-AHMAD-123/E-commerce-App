import React from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import cross from "../images/cross.svg";
import p1 from "../images/watch.jpg";


const CompareProducts = () => {
  return (
<>
<Meta title="Compare-Products" />
      <BreadCrumb title="Compare-Products" />
      <div className="compare wrapper">
        <div className="compare-product-card">
            <img src={cross} alt="" className='cross'/>
            <div className="compare-product-card-image">
                <img src={p1} alt="" />
            </div>
            <div className="compare-product-details">
                <h5 className="title">
                    Honor T1 7.0 1GB Ram 8GB Rom 7 Inch With Wifi+3G Tablet
                </h5>
                <h6 className="price">$1200</h6>
                <div>
                    <div className="product-detail">
                        <h5>Brand:</h5>
                        <p>Havels</p>
                    </div>
                    <div className="product-detail">
                        <h5>Type:</h5>
                        <p>Watch</p>
                    </div>
                    <div className="product-detail">
                        <h5>Availibility:</h5>
                        <p>In Stock</p>
                    </div>
                    <div className="product-detail">
                        <h5>Size:</h5>
                        <p>
                            <span>S</span>&nbsp;&nbsp;
                            <span>M</span>&nbsp;&nbsp;
                            <span>L</span>
                            
                            </p>
                       
                    </div>
                    <div className="product-detail">
                        <h5>Color:</h5>
                        <div className="colors">
             <ul >
                <li></li>
                <li></li>
                <li></li>
                
              </ul>
             </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="compare-product-card">
            <img src={cross} alt="" className='cross'/>
            <div className="compare-product-card-image">
                <img src={p1} alt="" />
            </div>
            <div className="compare-product-details">
                <h5 className="title">
                    Honor T1 7.0 1GB Ram 8GB Rom 7 Inch With Wifi+3G Tablet
                </h5>
                <h6 className="price">$1200</h6>
                <div>
                    <div className="product-detail">
                        <h5>Brand:</h5>
                        <p>Havels</p>
                    </div>
                    <div className="product-detail">
                        <h5>Type:</h5>
                        <p>Watch</p>
                    </div>
                    <div className="product-detail">
                        <h5>Availibility:</h5>
                        <p>In Stock</p>
                    </div>
                    <div className="product-detail">
                        <h5>Size:</h5>
                        <p>
                            <span>S</span>&nbsp;&nbsp;
                            <span>M</span>&nbsp;&nbsp;
                            <span>L</span>
                            
                            </p>
                       
                    </div>
                    <div className="product-detail">
                        <h5>Color:</h5>
                        <div className="colors">
             <ul >
                <li></li>
                <li></li>
                <li></li>
                
              </ul>
             </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="compare-product-card">
            <img src={cross} alt="" className='cross'/>
            <div className="compare-product-card-image">
                <img src={p1} alt="" />
            </div>
            <div className="compare-product-details">
                <h5 className="title">
                    Honor T1 7.0 1GB Ram 8GB Rom 7 Inch With Wifi+3G Tablet
                </h5>
                <h6 className="price">$1200</h6>
                <div>
                    <div className="product-detail">
                        <h5>Brand:</h5>
                        <p>Havels</p>
                    </div>
                    <div className="product-detail">
                        <h5>Type:</h5>
                        <p>Watch</p>
                    </div>
                    <div className="product-detail">
                        <h5>Availibility:</h5>
                        <p>In Stock</p>
                    </div>
                    <div className="product-detail">
                        <h5>Size:</h5>
                        <p>
                            <span>S</span>&nbsp;&nbsp;
                            <span>M</span>&nbsp;&nbsp;
                            <span>L</span>
                            
                            </p>
                       
                    </div>
                    <div className="product-detail">
                        <h5>Color:</h5>
                        <div className="colors">
             <ul >
                <li></li>
                <li></li>
                <li></li>
                
              </ul>
             </div>
                    </div>
                </div>
            </div>
        </div>
       
       
      </div>
      </>
  )
}

export default CompareProducts