import Axios from "axios";
import { getCookie } from "cookies-next";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axios.interceptors.request.use((config) => {
  const token = getCookie('auth_token');
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default axios;
