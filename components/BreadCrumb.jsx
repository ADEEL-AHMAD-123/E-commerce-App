import React from 'react'
import { Link } from 'react-router-dom';
import'../App.scss'
const BreadCrumb = (props) => {
  return (
    <div className='breadcrumb'>
        <div className='dev'>
            <Link to='/' id='link'>Home </Link>
            / &nbsp; {props.title}
        </div>
    </div>
  )
}

export default BreadCrumb