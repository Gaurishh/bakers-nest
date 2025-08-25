import axios from 'axios';

// Use environment variable for API URL, with localhost fallback for development
const baseURL = process.env.REACT_BACKEND_APP_API_URL || 'http://localhost:8000';

export default axios.create({
    baseURL: baseURL
});