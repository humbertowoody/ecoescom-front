// Import axios
import axios from "axios";
import User from "../models/User/User";
import SignUp from "../models/auth/Signup";

// Create axios instance with auth logic handled
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("user")
      ? "Bearer " +
        JSON.parse(localStorage.getItem("user") || '{"jwt":"hola"}').jwt
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(async (config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers["Authorization"] = "JWT " + access_token;
  }
  return config;
});

// Response error interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Prevent infinite loops early
    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
    }

    // If response status code is 401, redirect to login
    if (error.response.status === 401) {
      window.location.href = "/iniciar-sesion";
    }

    // If response status code is 403, redirect to login
    if (error.response.status === 403) {
      window.location.href = "/iniciar-sesion";
    }

    // Return any error which is not due to authentication back to the calling service
    return Promise.reject(error);
  }
);

export class AuthAPI {
  static login(email: string, password: string) {
    return axiosInstance.post("/auth/login/", {
      username: email,
      password: password,
    });
  }

  static async signUp(signUpDTO: SignUp): Promise<User> {
    try {
      return axiosInstance.post("/auth/signup", signUpDTO);
    } catch {
      throw new Error("Error signing up");
    }
  }
}

export default axiosInstance;
