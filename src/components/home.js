import React from 'react';
import repairImage from '../components/images/repair.jpg';
import accessoriesImage from '../components/images/accessories.jpg';
import softwareUpdateImage from '../components/images/software.jpg';
import sellingPhonesImage from '../components/images/phone1.jpg'; // Import the new image

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-text">Dealers in Japanese Phones</h1>
      </div>
      <div className="services-section">
        <h1 className="services-heading">OUR SERVICES</h1>
        <p className="services-description">
          We offer services like phone repair, deal in accessories, provide software updates, and sell phones.
        </p>
        <div className="service-container">
          <div className="service">
            <img src={sellingPhonesImage} alt="Selling Phones" className="service-image" />
            <h3>Selling Phones</h3>
            <p>Wide range of new and refurbished phones for sale.</p>
          </div>
          <div className="service">
            <img src={repairImage} alt="Phone Repair" className="service-image" />
            <h3>Phone Repair</h3>
            <p>Professional repair services for all phone models.</p>
          </div>
          <div className="service">
            <img src={accessoriesImage} alt="Phone Accessories" className="service-image" />
            <h3>Accessories</h3>
            <p>High-quality accessories for your phone.</p>
          </div>
          <div className="service">
            <img src={softwareUpdateImage} alt="Software Updates" className="service-image" />
            <h3>Software Update</h3>
            <p>Get the latest software updates for your phone.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
