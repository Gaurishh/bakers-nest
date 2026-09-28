import axios from 'axios';

// Use environment variable for API URL, with localhost fallback for development
const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: baseURL
});

let getIdToken = async () => undefined;

// Registered by AuthTokenBridge so non-component code (redux actions) can authenticate.
export const setIdTokenGetter = (getter) => {
    getIdToken = getter;
};

api.interceptors.request.use(async (config) => {
    const token = await getIdToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
