import React from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Blogs from "../components/Blogs";
import b1 from "../images/blog-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faYoutube,
    faTwitter,
    faInstagram,
  } from "@fortawesome/free-brands-svg-icons";
  import {
    faLeftLong

  } from "@fortawesome/free-solid-svg-icons";
const SingleBlog = () => {
  return (
<>
<BreadCrumb title="Static Blog" />
<Meta title="Static Blog" />
<div className="singleblog wrapper">
      <div className="sidebar">
          <div className="filter-card">
            <h3 className="filter-title">Find By Categories</h3>
            <div>
              <ul>
                <li>Watch</li>
                <li>Tv</li>
                <li>Camera</li>
                <li>Laptop</li>
              </ul>
            </div>
          </div>
        </div>
        <div id="main-section">
<div className='Single-blog'>
<h3 className="title">
    a beautifull sunday morning renaissance
</h3>
  <img src={b1} alt="" />
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia non ab officia necessitatibus reprehenderit? Laborum eligendi rem blanditiis est similique, consectetur sequi illum. A maiores fugit, fugiat consequatur temporibus odit! <br />
  Sapiente numquam, officiis accusantium reprehenderit voluptas eos veritatis, cum incidunt suscipit fuga eum eligendi ut nostrum quis. In voluptatum, soluta asperiores deserunt ipsa est aut, reprehenderit rerum cupiditate praesentium officiis. <br />
  Sapiente numquam, officiis accusantium reprehenderit voluptas eos veritatis, cum incidunt suscipit fuga eum eligendi ut nostrum quis. santium reprehenderit voluptas eos veritatis, cum incidunt suscipit fuga eum eligendi ut nostrum quis. In volu In voluptatum, soluta asperiores deserunt ipsa est aut, reprehenderit rerum cupiditate praesentium officiis.
  </p>
  <p>29 Aug 2023</p>
  <p>Jhon Doe</p>
</div>
<div className="blog-links">
    <div>
    <FontAwesomeIcon icon={faLeftLong} />
    <p>Back to blogs</p>
    </div>
    <div className="social-icons">
            <FontAwesomeIcon icon={faFacebook} className="socialicon"/>
            <FontAwesomeIcon icon={faYoutube} className="socialicon"/>
            <FontAwesomeIcon icon={faInstagram} className="socialicon"/>
            <FontAwesomeIcon icon={faTwitter} className="socialicon"/>
          </div>
</div>
       <div>

</div>
          </div>
          <div className='blog-form-div'>
  <h3 className="title">Leave A Comment</h3>
  <div className="contactpage-form">
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea placeholder="Comment"></textarea>
            <button type="submit" >Post Comment</button>
          </form>
        </div>
</div>
</div>

</>
  )
}

export default SingleBlog