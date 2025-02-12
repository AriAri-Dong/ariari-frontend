import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization:
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2NzczMzA4NDUxMDcyMzA2NTUiLCJ0b2tlblR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNzM5MzI1Mzg3LCJleHAiOjE3MzkzNjEzODd9.P4Z4pv0S6mLHpc-f9EVinpACz5o8J1vpnpX1HCAVi9KYVH4aZHYuyLcuUVNZWX0k",
  },
});
