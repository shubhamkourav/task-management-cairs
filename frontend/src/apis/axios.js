// Import the axios library
import axios from 'axios';

// Create and configure an Axios instance with default settings
export default axios.create({
  baseURL: 'http://localhost:3001/api', // Set the base URL for all requests
  headers: {
    'Content-Type': 'application/json', // Set the default content type for request headers
  },
});
