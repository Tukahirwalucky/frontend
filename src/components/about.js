// components/About.js
import React from 'react';


const About = () => {
  return (
    <div className="about">
      <h2>About Us</h2>
      <div className="about-content">
        <div className="about-section">
          <h3>Our Story</h3>
          <p>
            K-NET (U) Ltd was founded with the mission to provide the latest and greatest gadgets to tech enthusiasts. From smartphones to smart home devices, we aim to be your go-to source for all things tech.
          </p>
        </div>
        <div className="about-section">
          <h3>Our Values</h3>
          <p>
            We believe in providing high-quality products, exceptional customer service, and competitive prices. Our team is dedicated to staying on top of the latest trends and ensuring that our customers have access to the best gadgets on the market.
          </p>
        </div>
        <div className="about-section">
          <h3>Our Team</h3>
          <p>
            Our team is composed of passionate tech enthusiasts who are always excited to share their knowledge and help customers find the perfect gadgets. Whether you have a question about a product or need assistance with your order, we are here to help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
