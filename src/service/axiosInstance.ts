import axios from 'axios';

// Create an axios instance with the appropriate baseURL
const axiosInstance = axios.create({
  baseURL: 'https://selaconnect-server.onrender.com',
  headers: {
    "Content-Type": "application/json" // Set the content type to JSON
  }
});

export default axiosInstance;