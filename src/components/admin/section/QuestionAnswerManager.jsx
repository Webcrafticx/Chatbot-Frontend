import React, { useState, useEffect } from "react";
import { Trash2, Edit2, X } from "lucide-react";
import {
  createQAApi,
  updateQAApi,
  deleteQAApi,
  getQAsApi,
} from "../../../services/admin/api";

const QuestionAnswerManager = () => {
  const [qaList, setQaList] = useState([]);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    keywords: "",
    isDisplay: false,
  });
  const [isAddMode, setIsAddMode] = useState(true);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch Q&As on mount
  useEffect(() => {
    fetchQAs();
  }, []);

  // Get chatbotId from localStorage
  const getChatbotId = () => {
    return localStorage.getItem("chatbotId") || null;
  };

  //  Fetch all Q&As for the chatbot
  const fetchQAs = async () => {
    try {
      setLoading(true);
      const chatbotId = getChatbotId();
      if (!chatbotId) {
        console.warn("No chatbotId found in localStorage");
        return;
      }

      const response = await getQAsApi(chatbotId);

      //  handle your API structure properly
      if (response?.status && Array.isArray(response.list)) {
        setQaList(response.list);
      } else if (Array.isArray(response)) {
        setQaList(response);
      } else if (Array.isArray(response?.data)) {
        setQaList(response.data);
      } else {
        setQaList([]);
      }
    } catch (error) {
      console.error("Error fetching Q&As:", error);
      // alert("Failed to fetch Q&As");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //  Prepare payload (convert keywords string → array)
  const preparePayload = (data) => {
    return {
      chatbotId: getChatbotId(),
      question: data.question.trim(),
      answer: data.answer.trim(),
      isDisplay: data.isDisplay,
      keywords: data.keywords
        ? data.keywords
            .split(",")
            .map((kw) => kw.trim())
            .filter((kw) => kw.length > 0)
        : [],
    };
  };

  // Add or Update Q&A
  const handleAdd = async (e) => {
    e.preventDefault();
    if (formData.question.trim() && formData.answer.trim()) {
      try {
        setLoading(true);
        const payload = preparePayload(formData);

        if (editId) {
          await updateQAApi(editId, payload);
          setQaList((prev) =>
            prev.map((item) =>
              item._id === editId
                ? { ...item, ...payload }
                : item
            )
          );
          setEditId(null);
        } else {
          const response = await createQAApi(payload);
          if (response && (response._id || response.id)) {
            setQaList((prev) => [
              ...prev,
              {
                ...payload,
                _id: response._id || response.id,
              },
            ]);
          } else {
            setQaList((prev) => [
              ...prev,
              { ...payload, _id: Date.now().toString() },
            ]);
          }
        }

        setFormData({ question: "", answer: "", keywords: "", isDisplay: false });
      } catch (error) {
        console.error("Error saving Q&A:", error);
        // alert("Failed to save Q&A");
      } finally {
        setLoading(false);
      }
    }
  };

  // Edit Q&A
  const handleEdit = (id) => {
    const item = qaList.find((q) => q._id === id);
    if (!item) return;
    setFormData({
      question: item.question,
      answer: item.answer,
      keywords: Array.isArray(item.keywords)
        ? item.keywords.join(", ")
        : item.keywords,
      isDisplay: item.isDisplay,
    });
    setEditId(id);
    setIsAddMode(true);
  };

  // Open delete confirmation modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Delete Q&A
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteQAApi(deleteId);
      setQaList((prev) => prev.filter((item) => item._id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting Q&A:", error);
      // alert("Failed to delete Q&A");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 relative">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Question & Answer Manager
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Add new questions and answers or view the existing list
          </p>
        </div>

        <button
          onClick={() => setIsAddMode(!isAddMode)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer text-sm"
          disabled={loading}
        >
          {isAddMode ? "Switch to View Mode" : "Switch to Add Mode"}
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      )}

      {/* Add/Edit Mode */}
      {isAddMode ? (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 w-full max-w-5xl">
          <form onSubmit={handleAdd} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder="Enter question"
                required
                disabled={loading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black cursor-text disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer
              </label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                rows="4"
                placeholder="Enter answer"
                required
                disabled={loading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black cursor-text disabled:opacity-50"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                placeholder="Enter keywords (comma separated)"
                disabled={loading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black cursor-text disabled:opacity-50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple keywords with commas (e.g., buxar, patna, barh)
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isDisplay"
                checked={formData.isDisplay}
                onChange={handleChange}
                disabled={loading}
                className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black cursor-pointer disabled:opacity-50"
              />
              <label className="text-sm text-gray-700 cursor-pointer">
                Is Display
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition cursor-pointer disabled:opacity-50"
            >
              {editId ? "Update Q&A" : "Add Q&A"}
            </button>
          </form>
        </div>
      ) : (
        //  View Mode (show fetched data)
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto w-full max-w-5xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Answer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Keywords
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Is Display
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {qaList.length > 0 ? (
                qaList.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.question}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.answer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {Array.isArray(item.keywords) && item.keywords.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {item.keywords.map((kw, i) => (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">No keywords</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.isDisplay ? "True" : "False"}
                    </td>
                    <td className="px-6 py-4 flex space-x-3">
                      <button
                        onClick={() => handleEdit(item._id)}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => confirmDelete(item._id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-500 text-sm"
                  >
                    {loading ? "Loading Q&As..." : "No Q&A found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-lg bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Confirm Delete
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={loading}
                className="text-gray-500 hover:text-gray-700 cursor-pointer disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this Q&A?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={loading}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswerManager;
