import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      document.location = '/logout';
    }

    if (error.response?.data?.message) {
      return Promise.reject(error.response.data.message);
    }

    return Promise.reject(error);
  },
);

export default instance;
