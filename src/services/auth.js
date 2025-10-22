import axios from "axios";
import API_BASE_URL from "../config/api";

// Login API function
export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data; 
  } catch (error) {
    throw error.response?.data || { message: "Network error. Please try again." };
  }
};


export const logout = async () => {
  try {
    // Remove token from localStorage
    localStorage.removeItem("authToken");

    
    return { success: true };
  } catch (error) {
    throw error.response?.data || { message: "Logout failed. Please try again." };
  }
};
