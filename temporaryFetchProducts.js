// TemporaryFetchProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TemporaryFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/products/all'); // Replace with your API endpoint
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {error && <p>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TemporaryFetchProducts;
