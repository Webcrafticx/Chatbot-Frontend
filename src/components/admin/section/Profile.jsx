import React, { useState, useEffect } from "react";
import {
  Upload,
  Eye,
  Trash2,
  X,
  Facebook,
  Instagram,
  Youtube,
  Copy,
} from "lucide-react";
import {
  createChatbotApi,
  updateChatbotApi,
  getUserChatbotsApi,
} from "../../../services/admin/api";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    imageFile: null,
    description: "",
    welcomeMessage: "",
    facebook: "",
    instagram: "",
    youtube: "",
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatbotId, setChatbotId] = useState(null);
  const [chatbotLink, setChatbotLink] = useState("");

  useEffect(() => {
    fetchChatbotData();
  }, []);

  const fetchChatbotData = async () => {
    try {
      setLoading(true);
      const response = await getUserChatbotsApi();

      if (response?.status && response.chatbots) {
        const chatbot = response.chatbots;

        const fetchedData = {
          name: chatbot.companyName || "",
          image: chatbot.logoUrl || null,
          description: chatbot.description || "",
          welcomeMessage: chatbot.welcomeMessage || "",
          facebook: chatbot.socialLinks?.facebook || "",
          instagram: chatbot.socialLinks?.instagram || "",
          youtube: chatbot.socialLinks?.youtube || "",
        };

        setChatbotId(chatbot._id);
        setFormData(fetchedData);
        setSubmittedData(fetchedData);
        setIsEditing(false);

        if (chatbot.slug) {
          localStorage.setItem("chatbotSlug", chatbot.slug);
          setChatbotLink(
            `https://chatbot-frontend-ten-mu.vercel.app/${chatbot.slug}`
          );
        }
      } else {
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Error fetching chatbot data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
        imageFile: file,
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imageFile: null,
    }));
  };

  const preparePayload = () => {
    const payload = {
      companyName: formData.name,
      welcomeMessage: formData.welcomeMessage,
      description: formData.description,
      socialLinks: {
        facebook: formData.facebook,
        instagram: formData.instagram,
        youtube: formData.youtube,
      },
    };

    if (formData.imageFile) {
      const formDataObj = new FormData();
      Object.keys(payload).forEach((key) => {
        if (typeof payload[key] === "object") {
          formDataObj.append(key, JSON.stringify(payload[key]));
        } else {
          formDataObj.append(key, payload[key]);
        }
      });
      formDataObj.append("logo", formData.imageFile);
      return formDataObj;
    }

    if (!formData.image && !formData.imageFile) {
      return { ...payload, logo: null };
    }

    return { ...payload, logo: formData.image };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const payload = preparePayload();
      let response;

      if (chatbotId) {
        response = await updateChatbotApi(chatbotId, payload);
      } else {
        response = await createChatbotApi(payload);
      }

      if (response?.slug) {
        localStorage.setItem("chatbotSlug", response.slug);
        setChatbotLink(
          `https://chatbot-frontend-ten-mu.vercel.app/${response.slug}`
        );
      }

      setSubmittedData({
        ...formData,
        image: response?.logoUrl || formData.image,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving chatbot:", error);
      alert("Error saving chatbot details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    if (submittedData) setFormData(submittedData);
    setIsEditing(false);
  };
  const handleCopyLink = () => navigator.clipboard.writeText(chatbotLink);

  if (loading && !submittedData) {
    return (
      <div className="p-5 flex justify-center items-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Add / Edit Details
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter or update your name, image, description, welcome message, and
            social media links.
          </p>
        </div>

        <button
          onClick={() => setIsLinkModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
        >
          Chatbot Link
        </button>
      </div>

      {/* Chatbot Link Modal */}
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

      {/* Form Section */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 w-full max-w-5xl">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter company name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Upload Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Logo
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-gray-500 transition bg-gray-50 w-[70%] mx-auto">
                {!formData.image ? (
                  <>
                    <Upload className="h-10 w-10 text-gray-400 mb-3" />
                    <p className="text-gray-600 text-sm mb-2">
                      Drag & drop your logo here, or
                    </p>
                    <label
                      htmlFor="image"
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 cursor-pointer"
                    >
                      Choose File
                    </label>
                    <input
                      type="file"
                      id="image"
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
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center gap-3 transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => setPreviewOpen(true)}
                        className="bg-white text-black rounded-full p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="bg-white text-red-600 rounded-full p-2 hover:bg-gray-100 cursor-pointer"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Welcome Message */}
            <div>
              <label
                htmlFor="welcomeMessage"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Welcome Message
              </label>
              <textarea
                id="welcomeMessage"
                name="welcomeMessage"
                value={formData.welcomeMessage}
                onChange={handleChange}
                rows="3"
                placeholder="Enter welcome message for your chatbot"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  id: "facebook",
                  icon: <Facebook size={20} className="text-blue-600" />,
                  placeholder: "https://facebook.com/username",
                },
                {
                  id: "instagram",
                  icon: <Instagram size={20} className="text-pink-600" />,
                  placeholder: "https://instagram.com/username",
                },
                {
                  id: "youtube",
                  icon: <Youtube size={20} className="text-red-600" />,
                  placeholder: "https://youtube.com/@channelname",
                },
              ].map(({ id, icon, placeholder }) => (
                <div key={id} className="relative">
                  <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-2 capitalize"
                  >
                    {id} Link
                  </label>
                  <span className="absolute left-3 top-10 cursor-pointer">
                    {icon}
                  </span>
                  <input
                    type="url"
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-5 py-2.5 border border-gray-400 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 disabled:bg-gray-400 cursor-pointer"
              >
                {loading
                  ? "Saving..."
                  : chatbotId
                  ? "Update Details"
                  : "Save Details"}
              </button>
            </div>
          </form>
        ) : (
          // View Mode
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

              {submittedData.welcomeMessage && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-w-md w-full mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Welcome Message:
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {submittedData.welcomeMessage}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-5 mt-4">
              {submittedData.facebook && (
                <a
                  href={submittedData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <Facebook size={24} />
                </a>
              )}
              {submittedData.instagram && (
                <a
                  href={submittedData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 cursor-pointer"
                >
                  <Instagram size={24} />
                </a>
              )}
              {submittedData.youtube && (
                <a
                  href={submittedData.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <Youtube size={24} />
                </a>
              )}
            </div>

            <button
              onClick={handleEdit}
              className="mt-6 bg-black text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Edit Details
            </button>
          </div>
        )}

        {/* Image Preview Modal */}
        {previewOpen && formData.image && (
          <div className="fixed inset-0 backdrop-blur-lg bg-black/30 flex items-center justify-center z-50">
            <div className="relative">
              <img
                src={formData.image}
                alt="Full Preview"
                className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg cursor-pointer"
              />
              <button
                onClick={() => setPreviewOpen(false)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100 cursor-pointer"
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
