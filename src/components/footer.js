import React from 'react';

const Footer = () => {
  console.log('Rendering Footer');

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section social-media">
          <ul className="social-icons">
            <li><a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="https://twitter.com/"><i className="fab fa-twitter"></i></a></li>
            <li><a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a></li>
            <li><a href="https://www.tiktok.com/"><i className="fab fa-tiktok"></i></a></li>
            <li><a href="https://www.youtube.com/"><i className="fab fa-youtube"></i></a></li>
            <li><a href="https://www.snapchat.com/"><i className="fab fa-snapchat-ghost"></i></a></li>
          </ul>
          <p className="footer-info">All at Kojjashraf</p>
        </div>
        <div className="footer-section contact-info">
          <p>Find us @ Namirembe road,</p>
          <p>Tel: <a href="tel:+256709717910">+256 709717910</a> (available 24/7 online)</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} K-net. All rights reserved.</p>
      </div>
    </footer>
  );
};

console.log('Footer component loaded');

export default Footer;
