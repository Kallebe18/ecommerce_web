import axios from "axios";
import { getAccessToken } from "../utils/localStorage";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
