import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // backend URL
  withCredentials: true, // enable cookies for authentication
});

export default API;
