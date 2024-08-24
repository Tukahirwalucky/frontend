import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AddProduct from './addProduct';
import EditProduct from './editProduct';
import ProductList from './productList';
import OrdersList from './orderList';
import SignupList from './signupList';
import { getAllUsers, getAllProducts, getAllOrders } from '../../server/apiService';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchUsers = async () => {
    const usersData = await getAllUsers();
    setUsers(usersData);
  };

  const fetchProducts = async () => {
    const productsData = await getAllProducts();
    setProducts(productsData);
  };

  const fetchOrders = async () => {
    const ordersData = await getAllOrders();
    setOrders(ordersData);
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <ul>
          <li><Link to="products">Products</Link></li>
          <li><Link to="add-product">Add Product</Link></li>
          <li><Link to="orders">Orders</Link></li>
          <li><Link to="users">Users</Link></li>
        </ul>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="products" element={<ProductList products={products} />} />
          <Route path="add-product" element={<AddProduct onProductAdded={fetchProducts} />} />
          <Route path="edit-product/:id" element={<EditProduct onProductUpdated={fetchProducts} />} />
          <Route path="orders" element={<OrdersList orders={orders} />} />
          <Route path="users" element={<SignupList users={users} onUserAdded={fetchUsers} />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
