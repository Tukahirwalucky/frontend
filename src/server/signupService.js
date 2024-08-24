import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/v1/users';

// Function to create an axios instance with optional authorization token
const updateAxiosInstance = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: token ? {
      Authorization: `Bearer ${token}`,
    } : {},
  });
};

// Function to create a new user
const createUser = async (userData) => {
  try {
    const axiosInstance = updateAxiosInstance(); // No need for token to create user
    const response = await axiosInstance.post('/register', userData); // Make POST request to register user
    return response.data; // Return response data
  } catch (error) {
    // Improved error handling
    if (error.response) {
      console.error('Error creating user:', error.response.data);
      throw new Error(`Server responded with status ${error.response.status}: ${error.response.data.error || 'Unknown error'}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please check your network connection.');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
};

// Function to get all users
const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('access_token'); // Fetch the token from local storage
    const axiosInstance = updateAxiosInstance(token); // Create axios instance
    const response = await axiosInstance.get('/all'); // Make GET request to fetch all users
    return response.data; // Return response data
  } catch (error) {
    // Improved error handling
    if (error.response) {
      console.error('Error fetching users:', error.response.data);
      throw new Error(`Server responded with status ${error.response.status}: ${error.response.data.error || 'Unknown error'}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please check your network connection.');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
};

// Function to login user
const loginUser = async (userData) => {
  try {
    const axiosInstance = updateAxiosInstance(); // No need for token to login
    const response = await axiosInstance.post('/login', userData); // Make POST request to login user
    localStorage.setItem('access_token', response.data.access_token); // Save token in local storage
    return response.data; // Return response data
  } catch (error) {
    // Improved error handling
    if (error.response) {
      console.error('Error logging in user:', error.response.data);
      throw new Error(`Server responded with status ${error.response.status}: ${error.response.data.error || 'Unknown error'}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please check your network connection.');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
};

export {
  createUser,
  getAllUsers,
  loginUser,
};
