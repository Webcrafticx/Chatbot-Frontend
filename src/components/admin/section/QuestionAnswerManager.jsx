import React, { useState } from "react";
import { Trash2, Edit2, X } from "lucide-react";

const QuestionAnswerManager = () => {
  const [qaList, setQaList] = useState([]);
  const [formData, setFormData] = useState({ question: "", answer: "", toView: false });
  const [isAddMode, setIsAddMode] = useState(true);
  const [editId, setEditId] = useState(null);

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add or Update Q&A
  const handleAdd = (e) => {
    e.preventDefault();
    if (formData.question.trim() && formData.answer.trim()) {
      if (editId) {
        setQaList((prev) =>
          prev.map((item) => (item.id === editId ? { ...formData, id: editId } : item))
        );
        setEditId(null);
      } else {
        setQaList((prev) => [...prev, { ...formData, id: Date.now() }]);
      }
      setFormData({ question: "", answer: "", toView: false });
    }
  };

  // Edit Q&A
  const handleEdit = (id) => {
    const item = qaList.find((q) => q.id === id);
    setFormData({ question: item.question, answer: item.answer, toView: item.toView });
    setEditId(id);
    setIsAddMode(true);
  };

  // Open delete confirmation modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Delete Q&A
  const handleDelete = () => {
    setQaList((prev) => prev.filter((item) => item.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="p-5 relative">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Question & Answer Manager</h2>
          <p className="text-sm text-gray-600 mt-1">
            Add new questions and answers or view the existing list
          </p>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsAddMode(!isAddMode)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer text-sm"
        >
          {isAddMode ? "Switch to View Mode" : "Switch to Add Mode"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {isAddMode ? (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 w-full max-w-5xl">
          <form onSubmit={handleAdd} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder="Enter question"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black cursor-text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                rows="4"
                placeholder="Enter answer"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black cursor-text"
              ></textarea>
            </div>

            {/* Toggle for Payload */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="toView"
                checked={formData.toView}
                onChange={handleChange}
                className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black cursor-pointer"
              />
              <label className="text-sm text-gray-700 cursor-pointer">To View</label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition cursor-pointer"
            >
              {editId ? "Update Q&A" : "Add Q&A"}
            </button>
          </form>
        </div>
      ) : (
        // View Mode Table
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto w-full max-w-5xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-default">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-default">
                  Answer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-default">
                  To View
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-default">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {qaList.length > 0 ? (
                qaList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 cursor-pointer">
                      {item.question}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.answer}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 cursor-pointer">
                      {item.toView ? "True" : "False"}
                    </td>
                    <td className="px-6 py-4 flex space-x-3">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => confirmDelete(item.id)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-gray-500 text-sm cursor-default"
                  >
                    No Q&A added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this Q&A?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswerManager;
