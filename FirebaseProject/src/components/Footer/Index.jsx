import React from 'react';
import { TwitterOutlined, FacebookOutlined, YoutubeOutlined, LinkedinOutlined } from '@ant-design/icons';
import "../../Scss/footer.scss"
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3 className="footer-heading">Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Reservation</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Condition</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Contact</h3>
          <ul>
            <li><span role="img" aria-label="location">📍</span> 123 Street, New York, USA</li>
            <li><span role="img" aria-label="phone">📞</span> +012 345 67890</li>
            <li><span role="img" aria-label="email">📧</span> info@example.com</li>
          </ul>
          <div className="social-icons">
            <a href="#"><TwitterOutlined /></a>
            <a href="#"><FacebookOutlined /></a>
            <a href="#"><YoutubeOutlined /></a>
            <a href="#"><LinkedinOutlined /></a>
          </div>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Opening</h3>
          <p>Monday - Saturday</p>
          <p>09AM - 09PM</p>
          <p>Sunday</p>
          <p>10AM - 08PM</p>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Newsletter</h3>
          <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>©{year} All Rights Reserved</p>
      </div>
    </footer>
  );
}
