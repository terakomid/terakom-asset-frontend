import axios from "axios";

// let apiURL = "http://localhost:8000/api/";
let apiURL = "http://api-asset.terakom.id/api/";

axios.defaults.baseURL = apiURL;
axios.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if (token) config.headers.Authorization = `Bearer ${token}`;
   return config;
});

export default axios;
