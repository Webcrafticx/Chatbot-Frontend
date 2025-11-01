import axios from "axios";
import API_BASE_URL from "../../config/api";

export const registerApi = async (name, email, password, role = "user") => {
  try {
    // const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      { name, email, password, role },
      {
        headers: {
          "Content-Type": "application/json",
          // ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed. Please try again." };
  }
};

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/admin/users`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch users." };
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_BASE_URL}/admin/delete-users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete user." };
  }
};

// POST /api/auth/admin/renew - Renew user subscription
export const renewSubscriptionApi = async (renewData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/auth/admin/renew`,
      renewData,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error renewing subscription:", error);
    throw error;
  }
};