import axios from 'axios';

console.log(process.env.VERCEL_URL)

export const api = axios.create({
  baseURL: "https://" + process.env.VERCEL_URL + "/api"
});
