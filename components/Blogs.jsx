import React from 'react';
import '../App.scss';
import { Link } from 'react-router-dom';
import blog1 from '../images/blog-1.jpg'
const Blogs = () => {
  return (
<>
<div className="blog">
<div className="blog-image">
<img src={blog1} alt="" />
</div>
<div className="blog-content">
    <p className="date">12 August, 2023</p>
    <h5 className="title">A beautifull sunday morning remaissance</h5>
    <p className="desc">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam cumque consectetur veritatis.
    </p>
    <Link className='button'>Read More</Link>
</div>
</div>
</>
  )
}

export default Blogs