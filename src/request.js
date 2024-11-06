import axios from "axios";

const request = axios.create({
  baseURL: "https://racing-be.vercel.app",
  // timeout: 10 * 60 * 1000,
  // baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;
