import axios from 'axios';
import { getToken } from '../services/authServices';

const http = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'x-auth-token': getToken(),
  },
});

export default http;
