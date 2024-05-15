import React from 'react'
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Blogs from "../components/Blogs";
const BlogsPage = () => {
  return (
<>
<Meta title="Blogs" />
      <BreadCrumb title="Blogs" />
      <div className="store wrapper">
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
<div className='blogs-listing'>
  <Blogs/>
  <Blogs/>
  <Blogs/>
  <Blogs/>
  
</div>
       <div>

</div>
          </div>
      </div>
</>
  )
}

export default BlogsPage 