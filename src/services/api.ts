import axios from 'axios';

export const api = axios.create({
  baseURL: "https://" + process.env.REACT_APP_VERCEL_URL + "/api"
});
