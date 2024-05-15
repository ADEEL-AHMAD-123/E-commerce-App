import React from 'react';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faHouseChimney,faPhone,faCircleInfo} from '@fortawesome/free-solid-svg-icons'




const ContactPage = () => {
  return (
    <>
      <Meta title="Contact" />
      <BreadCrumb title="Contact" />
      <div className="wrapper"> 
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13221.930242575869!2d72.0112596!3d34.057142000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38decdc3e379e459%3A0xfc6426cfc34af482!2sRisalpur%20Bazar!5e0!3m2!1sen!2s!4v1693220647966!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="contact">
<div className='div'>
  <h3 className="title">Contact</h3>
  <div className="contactpage-form">
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Phone Number" />
            <textarea placeholder="Comment"></textarea>
            <button type="submit" >Submit</button>
          </form>
        </div>
</div>
<div className='div'>
  <h3 className="title">Get In Touch With Us</h3>
  <div className="contact-info">

  <FontAwesomeIcon icon={faHouseChimney} />
 <span>3.5 New Plaza, XYZ City, Z-State, America </span><br />

 <FontAwesomeIcon icon={faEnvelope} />
 <span>Demo@compny.com</span><br />

 <FontAwesomeIcon icon={faPhone} />
 <span>(+92) 311-12345678 </span><br />

 <FontAwesomeIcon icon={faCircleInfo} />
 <span>Monday - Friday 10AM - 8PM </span><br />

  </div>
</div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
