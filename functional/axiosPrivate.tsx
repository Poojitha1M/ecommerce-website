import axios from "axios";

const instance: any = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config: any) => {
    return config;
  },
  (error: any) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: any) => {
    return response?.data
  }
);

export default instance;
