import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const test_token =
  "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2NzIzMzQ5OTQ5NzgyODAyMTgiLCJ0b2tlblR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJpYXQiOjE3MzgyNDkxMDgsImV4cCI6MTczODI1MDkwOH0.4e3Lqrw1MR3Q0Ozs_Pw2zOpIzknttVRrcKgPVzOXLI8f9kFRyjKznaVkkSz7KkHR";

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${test_token}`,
  },
});

export default axiosInstance;
