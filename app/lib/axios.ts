"use client";
import _axios, { Axios, AxiosInstance } from "axios";
export const api_url = process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = _axios.create({
  baseURL: api_url,
  headers: {
    Authorization: typeof window !== "undefined" 
      ? `Bearer ${localStorage.getItem("Auth-Token")}`
      : "",
  },
});

// Update authorization header when token changes
if (typeof window !== "undefined") {
  const token = localStorage.getItem("Auth-Token");
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}
