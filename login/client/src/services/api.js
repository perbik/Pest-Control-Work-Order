import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5137',  
});

export default api;
