import axios from 'axios';
import { BACKEND_URL_LOCAL, BACKEND_URL_HOSTING } from 'utils/config';

export const axiosClient = axios.create({
  // baseURL: BACKEND_URL_LOCAL,
  baseURL: BACKEND_URL_HOSTING,

  headers: {
    'Content-Type': 'application/json'
  }
});
