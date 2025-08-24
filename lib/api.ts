// const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
// const BASE_URL = "https://notehub-public.goit.study/api";

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${myToken}`,
//   },
// });

import axios from "axios";

export const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  withCredentials: true,
});
