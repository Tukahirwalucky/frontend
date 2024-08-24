import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import About from './components/about';
import Product from './components/product';
import Login from './components/signup';
import Navbar from './components/navbar';
import Footer from './components/footer';
import AdminDashboard from './components/adminDashboard/adminDashboard';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/adminDashboard/*" element={<AdminDashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} /> 
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
