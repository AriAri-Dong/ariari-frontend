import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2ODI0NzY4NjM3NDQwNTEwMDIiLCJ0b2tlblR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNzQwNTYwMTc0LCJleHAiOjE3NDA1OTYxNzR9.FraspNoublYM172pEmzm4FJ4SwIaSweRks1xqEiqkBoHUslzhImrj5exERBpqPA-",
  },
  withCredentials: true,
});

function validateResponse(error: { response: { status: number; data: any } }) {
  if (!error.response) {
    return "네트워크 오류입니다.";
  }

  if (error.response.status >= 400 && error.response.status < 600) {
    return error;
  }

  if (error.response.data) {
    return error.response.data;
  }
}

api.interceptors.request.use(
  (config) => {
    // console.log("🔮 [Req]", config.headers, config.url, "\n");
    return config;
  },
  (error) => {
    // console.log("🧨 [Req ERROR]", error, "\n");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // console.log('🔮 [Res]', response.status, response.config.url, '\n');
    return response;
  },
  (error) => {
    // console.log('🧨 [Res ERROR]', error, '\n');
    return Promise.reject(validateResponse(error));
  }
);

export default api;
