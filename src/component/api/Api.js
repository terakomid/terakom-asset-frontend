import axios from "axios";

let apiURL = "http://localhost:8000/api/";
// let apiURL = "http://api-asset.terakom.id/api/";

let token = localStorage.getItem("token");

const axiosInstance = axios.create({
   baseURL: apiURL,
   headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
   },
});

export default axiosInstance;
