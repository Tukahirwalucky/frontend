import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../server/productService'; // Default import

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    productService.getProductById(id).then(response => {
      setProduct(response.data);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    productService.updateProduct(id, product).then(() => {
      // handle success, e.g., show a success message or redirect
    });
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
