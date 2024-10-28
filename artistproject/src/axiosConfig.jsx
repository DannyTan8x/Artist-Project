import axios from "axios";
import { useContext } from "react";
import { MainContext } from "./components/ContextProvider/MainContext";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DATA_HOST_API,
  headers: {
    // Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//function to setup interceptors
export const SetupAxiosInterceptors = () => {
  const { showLoginModal } = useContext(MainContext);
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // navigate("/login");
        showLoginModal();
      }
      return Promise.reject(error);
    }
  );
};

//function to set authorization token.
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export default axiosInstance;
