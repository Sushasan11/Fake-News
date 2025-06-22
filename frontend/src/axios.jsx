import axios from "axios";

// Axios instance configured for your backend
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
