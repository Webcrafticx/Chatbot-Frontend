import React, { useState } from "react";
import {
  Upload,
  Eye,
  Trash2,
  X,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Copy,
} from "lucide-react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    description: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // 👇 chatbot link modal state
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const chatbotLink = "https://your-chatbot-link-here.com"; // 🪄 Apna chatbot link yaha daalo

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // ✅ Copy link silently (no alert)
  const handleCopyLink = () => {
    navigator.clipboard.writeText(chatbotLink);
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Add / Edit Details</h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter or update your name, image, description and social media links
          </p>
        </div>

        {/* Chatbot Link Button */}
        <button
          onClick={() => setIsLinkModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
        >
          Chatbot Link
        </button>
      </div>

      {/* 🪄 Chatbot Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md relative">
            <button
              onClick={() => setIsLinkModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Chatbot Link
            </h3>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="text"
                value={chatbotLink}
                readOnly
                className="w-full px-3 py-2 text-gray-700 outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="bg-black text-white px-3 py-2 hover:bg-gray-800 cursor-pointer"
              >
                <Copy size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Click the copy icon to copy the chatbot link.
            </p>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 w-full max-w-5xl">
        {!submittedData || isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Image
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-gray-500 transition bg-gray-50 w-[70%] mx-auto">
                {!formData.image ? (
                  <>
                    <Upload className="h-10 w-10 text-gray-400 mb-3" />
                    <p className="text-gray-600 text-sm mb-2">
                      Drag & drop your image here, or
                    </p>
                    <label
                      htmlFor="image"
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
                    >
                      Choose File
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </>
                ) : (
                  <div className="relative group cursor-pointer">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-40 w-40 object-cover rounded-lg border shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                      <button
                        type="button"
                        onClick={() => setPreviewOpen(true)}
                        title="Preview"
                        className="bg-white text-black rounded-full p-2 hover:bg-gray-100 transition cursor-pointer"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, image: null }))
                        }
                        title="Delete"
                        className="bg-white text-red-600 rounded-full p-2 hover:bg-gray-100 transition cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
                placeholder="Enter description"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>

            {/* Social Media Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Facebook */}
              <div className="relative">
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Facebook Link
                </label>
                <span className="absolute left-3 top-10 text-blue-600">
                  <Facebook size={20} />
                </span>
                <input
                  type="url"
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="https://facebook.com/username"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Instagram */}
              <div className="relative">
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Instagram Link
                </label>
                <span className="absolute left-3 top-10 text-pink-600">
                  <Instagram size={20} />
                </span>
                <input
                  type="url"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/username"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* LinkedIn */}
              <div className="relative">
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  LinkedIn Link
                </label>
                <span className="absolute left-3 top-10 text-blue-700">
                  <Linkedin size={20} />
                </span>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Twitter */}
              <div className="relative">
                <label
                  htmlFor="twitter"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  X (Twitter) Link
                </label>
                <span className="absolute left-3 top-10 text-gray-800">
                  <Twitter size={20} />
                </span>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="https://x.com/username"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
            >
              {isEditing ? "Update Details" : "Save Details"}
            </button>
          </form>
        ) : (
          // Display submitted data
          <div className="space-y-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              ChatBot Details
            </h3>

            <div className="flex flex-col items-center gap-4">
              {submittedData.image && (
                <img
                  src={submittedData.image}
                  alt={submittedData.name}
                  className="h-32 w-32 object-cover rounded-lg border"
                />
              )}
              <p className="text-lg font-medium text-gray-900">
                {submittedData.name}
              </p>
              <p className="text-gray-700 max-w-md">
                {submittedData.description}
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-5 mt-4">
              {submittedData.facebook && (
                <a
                  href={submittedData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Facebook size={24} />
                </a>
              )}
              {submittedData.instagram && (
                <a
                  href={submittedData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800"
                >
                  <Instagram size={24} />
                </a>
              )}
              {submittedData.linkedin && (
                <a
                  href={submittedData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900"
                >
                  <Linkedin size={24} />
                </a>
              )}
              {submittedData.twitter && (
                <a
                  href={submittedData.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-black"
                >
                  <Twitter size={24} />
                </a>
              )}
            </div>

            <button
              onClick={handleEdit}
              className="mt-6 bg-black text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
            >
              Edit Details
            </button>
          </div>
        )}

        {/* Full Image Preview Modal */}
        {previewOpen && formData.image && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer">
            <div className="relative">
              <img
                src={formData.image}
                alt="Full Preview"
                className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg"
              />
              <button
                onClick={() => setPreviewOpen(false)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100 cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
