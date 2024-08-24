import axios from 'axios';

// Fetch token from storage
let accessToken = localStorage.getItem('access_token') || '';
const refreshToken = localStorage.getItem('refresh_token');

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/v1',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response && error.response.status === 401 && error.response.data.error === 'Token has expired') {
      try {
        // Request a new token
        const refreshResponse = await axios.post('http://127.0.0.1:5000/api/v1/refresh-token', { refresh_token: refreshToken });
        const newAccessToken = refreshResponse.data.access_token;
        localStorage.setItem('access_token', newAccessToken); // Store new token

        // Update axios instance headers
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        // Optional: Redirect user to login or handle error
        return Promise.reject(refreshError);
      }
    }

    // Return other errors
    return Promise.reject(error);
  }
);

const addProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/products', productData); // Ensure endpoint matches
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error adding product');
    throw error;
  }
};

const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/products'); // Ensure endpoint matches
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Error fetching products');
    throw error;
  }
};

// Centralized error handler
const handleAxiosError = (error, customMessage) => {
  if (error.response) {
    console.error(`${customMessage}:`, error.response.data);
  } else if (error.request) {
    console.error('Network error:', error.request);
  } else {
    console.error('Error:', error.message);
  }
};

const productService = {
  addProduct,
  getAllProducts,
};

export default productService;
