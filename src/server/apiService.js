import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/v1';

const updateAxiosInstance = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const axiosInstance = updateAxiosInstance(token);
    const response = await axiosInstance.get('/users/all');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching users:', error.response.data);
      throw new Error(error.response.data.message || 'An error occurred during fetching users');
    } else {
      console.error('Error fetching users:', error.message);
      throw new Error('An error occurred during fetching users');
    }
  }
};

const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, userData);
    localStorage.setItem('access_token', response.data.access_token);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error logging in user:', error.response.data);
      throw new Error(error.response.data.message || 'An error occurred during login');
    } else {
      console.error('Error logging in user:', error.message);
      throw new Error('An error occurred during login');
    }
  }
};

const getAllProducts = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const axiosInstance = updateAxiosInstance(token);
    const response = await axiosInstance.get('/products/all');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching products:', error.response.data);
      throw new Error(error.response.data.message || 'An error occurred during fetching products');
    } else {
      console.error('Error fetching products:', error.message);
      throw new Error('An error occurred during fetching products');
    }
  }
};

const getAllOrders = async () => {
  try {
    const token = localStorage.getItem('access_token');
    const axiosInstance = updateAxiosInstance(token);
    const response = await axiosInstance.get('/orders/all');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching orders:', error.response.data);
      throw new Error(error.response.data.message || 'An error occurred during fetching orders');
    } else {
      console.error('Error fetching orders:', error.message);
      throw new Error('An error occurred during fetching orders');
    }
  }
};

export {
  getAllUsers,
  loginUser,
  getAllProducts,
  getAllOrders,
};
