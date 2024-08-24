import React, { useState } from 'react';
import axios from 'axios';


const AddProduct = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleAddProduct = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setFeedbackMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/products', {
        name,
        price,
        description,
        imageUrl
      });
      console.log('Product added:', response.data);
      setFeedbackMessage('Product added successfully!');
      if (onProductAdded) {
        onProductAdded(); // Call the callback function to refresh product list
      }
      // Clear the form fields after successful submission
      setName('');
      setPrice('');
      setDescription('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding product:', error);
      setFeedbackMessage(`Error: ${error.response?.data?.error || error.message || 'An error occurred. Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add Product</h2>
      {feedbackMessage && <p>{feedbackMessage}</p>}
      <form onSubmit={handleAddProduct}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
