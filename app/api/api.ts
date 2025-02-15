import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization:
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2Nzg0MjY5MDI2MjA3NzI4OTMiLCJ0b2tlblR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNzM5NTg3NzY5LCJleHAiOjE3Mzk2MjM3Njl9.REZ38JiRalvZNm4n3lfqxhOIHrcwDSNnvy4t2U-tZw_cAYpVmdS4Ldwu7-XJfE32",
  },
});
