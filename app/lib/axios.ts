"use client";
import _axios, { Axios, AxiosInstance } from "axios";
export const api_url = process.env.NEXT_PUBLIC_API_URL;
export function axios(): AxiosInstance {
  let kAxios = _axios.create({
    baseURL: api_url,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Auth-Token")}`,
    },
  });
  return kAxios
}
