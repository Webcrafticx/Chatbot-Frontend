import axios from "axios";
import API_BASE_URL from "../../config/api";

// Common function to get headers
export const getHeaders = (isFormData = false) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  if (isFormData) delete headers["Content-Type"]; 
  return headers;
};


// Helper to build FormData (handles files and arrays)
const buildFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach((item) => formData.append(`${key}[]`, item));
    } else if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }
  return formData;
};

// POST /api/user/chatbots - Create a new chatbot
export const createChatbotApi = async (chatbotData) => {
  try {
        const formData = buildFormData(chatbotData);

    const response = await axios.post(
      `${API_BASE_URL}/user/chatbots`,
      formData,
      {
        headers: getHeaders(true),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating chatbot:", error);
    throw error;
  }
};

// PATCH /api/chatbot/{id} - Update an existing chatbot
export const updateChatbotApi = async (chatbotId, chatbotData) => {
  try {

        const formData = buildFormData(chatbotData);

    const response = await axios.patch(
      `${API_BASE_URL}/chatbot/${chatbotId}`,
      formData,
      {
        headers: getHeaders(true),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating chatbot:", error);
    throw error;
  }
};

// GET /api/user/chatbots - Get user's chatbots
export const getUserChatbotsApi = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/chatbots`, {
      headers: getHeaders(),
    });

    const data = response.data;

    if (data?.status && data?.chatbots) {
      const chatbot = data.chatbots;
      if (chatbot._id) localStorage.setItem("chatbotId", chatbot._id);
      if (chatbot.slug) localStorage.setItem("chatbotSlug", chatbot.slug);
    }

    return data;
  } catch (error) {
    console.error("Error fetching chatbots:", error);
    throw error;
  }
};

// Q&A APIs

// POST /api/user/qa - Create new Q&A
export const createQAApi = async (qaData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/qa`,
      qaData,
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating Q&A:", error);
    throw error;
  }
};

// PUT /api/user/qa/{id} - Update existing Q&A
export const updateQAApi = async (qaId, qaData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/qa/${qaId}`,
      qaData,
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating Q&A:", error);
    throw error;
  }
};

// DELETE /api/user/qa/{id} - Delete Q&A
export const deleteQAApi = async (qaId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/user/qa/${qaId}`,
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting Q&A:", error);
    throw error;
  }
};

// GET /api/user/qa - Get all Q&As 
export const getQAsApi = async (chatbotId) => {
  try {
    const url = `${API_BASE_URL}/user/get-all-qa/${chatbotId}`;

    const response = await axios.get(url, {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching Q&As:", error);
    throw error;
  }
};


// Visitors APIs

// GET /api/chat/{slug}/visitorslist - Get visitors list
export const getVisitorsListApi = async (slug, params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Add optional parameters
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    if (params.fromDate) queryParams.append('fromDate', params.fromDate);

    const url = `${API_BASE_URL}/chat/${slug}/visitorslist${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await axios.get(url, {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching visitors list:", error);
    throw error;
  }
};

// PUT /api/chat/{slug}/visitor/{id}/status - Update visitor issue status
export const updateVisitorStatusApi = async (slug, visitorId, statusData) => {
  try {
    const url = `${API_BASE_URL}/chat/${slug}/visitor/${visitorId}/status`;

    const response = await axios.put(url, statusData, {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error("Error updating visitor status:", error);
    throw error;
  }
};
