import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
