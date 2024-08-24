import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/v1/products/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Adjust as necessary for your auth setup
          }
        });
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {products.length === 0 ? (
        <div>No products found</div>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <p>{product.stock}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
