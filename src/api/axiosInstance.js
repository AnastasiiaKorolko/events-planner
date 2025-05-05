import axios from 'axios';
import { store } from '../app/store';

const instance = axios.create({
  baseURL: 'https://your-backend-api.com/api',
});

instance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default instance;