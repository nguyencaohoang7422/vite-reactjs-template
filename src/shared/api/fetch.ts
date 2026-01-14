import { store } from "@/configs";
import { cookieName } from "../constants";

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  
  // 1. Request Interceptor: Tự động gắn Token
  const tokenFromCookie = await cookieStore.get(cookieName);
const token = store.getState().auth.token || tokenFromCookie;
    
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(endpoint, { ...options, headers });

    // 2. Response Interceptor: Xử lý lỗi hệ thống
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Lỗi: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("API Error:", error.message);
    throw error;
  }
};

// 3. Export các phương thức tiện ích
export const fetchApi = {
  get: (url: string) => apiFetch(url, { method: "GET" }),
  post: (url: string, data: any) => 
    apiFetch(url, { method: "POST", body: JSON.stringify(data) }),
  put: (url: string, data: any) => 
    apiFetch(url, { method: "PUT", body: JSON.stringify(data) }),
  delete: (url: string) => apiFetch(url, { method: "DELETE" }),
};