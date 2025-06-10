import axios from 'axios';

const API = axios.create({
  baseURL: "https://api-gateway-xrx2.onrender.com/api",
  withCredentials: true,
});

export default API;
