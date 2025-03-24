import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization:
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2Nzg0NTQwMzA2NzU3Nzc1MjIiLCJ0b2tlblR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNzM5NTk2MTMxLCJleHAiOjE3Mzk2MzIxMzF9.YThJH8LnOBdUHYPZoJNfGl2SPiWazRz1AI3dBTWK03IfX2ky0ph7NAhnpqqcuSih",
  },
});
