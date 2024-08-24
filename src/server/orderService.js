import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/v1/orders';

let axiosInstance = null;

const updateAxiosInstance = (token) => {
  axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const initializeAxiosInstance = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    updateAxiosInstance(token);
  } else {
    console.error('No token found in localStorage');
  }
};

const addOrder = async (order) => {
  try {
    if (!axiosInstance) {
      initializeAxiosInstance();
    }
    const response = await axiosInstance.post('/', order);
    return response.data;
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
};

const orderService = {
  addOrder,
};

export default orderService;
