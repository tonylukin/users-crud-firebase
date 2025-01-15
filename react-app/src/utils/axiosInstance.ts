import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3099',
});

export default axiosInstance;
