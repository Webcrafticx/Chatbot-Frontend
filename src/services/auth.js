import axios from "axios";
import API_BASE_URL from "../config/api";

// Login API function
export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    const data = response.data;

    if (data?.token) {
      // Store token and subscription info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data?.user?.role || "");
      localStorage.setItem("subscriptionStatus", data?.user?.subscriptionStatus || "inactive");
      localStorage.setItem("subscriptionEndDate", data?.user?.subscriptionEndDate || "");
      localStorage.setItem("userId", data?.user?.id || "");
    }

    return data;
  } catch (error) {
    throw error.response?.data || { message: "Network error. Please try again." };
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("subscriptionStatus");
    localStorage.removeItem("subscriptionEndDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("chatbotId");
    localStorage.removeItem("chatbotSlug");

    return { success: true };
  } catch (error) {
    throw error.response?.data || { message: "Logout failed. Please try again." };
  }
};
