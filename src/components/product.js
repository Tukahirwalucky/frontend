import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../server/productService'; // Import your product service

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts(); // Fetch products using the updated function
        console.log('Fetched products:', data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Expected an array but received:', data);
          setError('Unexpected data format received from the server.');
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to fetch products. Please try again later.');
      }
    };

    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('You must be logged in to view products');
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const handleOrderNow = async (product) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('You must be logged in to place an order');
      navigate('/login');
      return;
    }

    const order = {
      productId: product.id,
      quantity: 1, // Example quantity; adjust as needed
      totalPrice: product.price, // Example total price; adjust as needed
    };

    try {
      await productService.addOrder(order); // Call the order service to place the order
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="product-list-container">
      <h1>ORDER YOUR LATEST PHONES</h1>
      {error && <p className="error">{error}</p>}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-item">
              <div className="product-image-container">
                <img
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <h2>{product.name}</h2>
              <p>${product.price}</p>
              <button onClick={() => handleOrderNow(product)}>Order Now</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Product;
