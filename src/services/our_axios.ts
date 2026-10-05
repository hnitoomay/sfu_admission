import axios from "axios";
import { API_URL } from "../setting/API";

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
//api.interceptors.request.use(
//  (config) => {
//    const authRoutes = [
//      "/login",
//      "/register",
//      "/otp",
//      "/download/brochure",
//      "/forget/otp",
//      "/forget/password",
//    ];
//
//    const infoRoutes = [
//      "/program-overviews",
//      "/specialisations",
//      "/assessments",
//      "/faqs",
//      "/core-modules",
//      "/lecture-profiles",
//      "/admission-requirements",
//      "/program/detail/",
//    ];
//
//    const withoutTokenRoute =
//      authRoutes.some((route) => config.url?.startsWith(route)) ||
//      infoRoutes.some((route) => config.url?.startsWith(route));
//
//    if (!withoutTokenRoute) {
//      const data = JSON.parse(localStorage.getItem("user") || "");
//      const token = data.token;
//      config.headers.Authorization = `Bearer ${token}`;
//    }
//    return config;
//  },
//  (error) => Promise.reject(error)
//);

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    if (user) {
      const token = user.token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api;
