import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerApi } from "../../../services/superadmin/api";

const RegisterForm = ({ onAddUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);

    try {
      const newUser = await registerApi(
        formData.name,
        formData.email,
        formData.password,
        "user"
      );

      setMessage({ text: "User registered successfully!", type: "success" });
      setFormData({ name: "", email: "", password: "" });

      // Notify parent to add user to table
      if (onAddUser) {
        onAddUser(newUser);
      }
    } catch (error) {
      setMessage({
        text: error.message || "Something went wrong during registration.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Register New User</h2>
        <p className="text-sm text-gray-600 mt-1">
          Add a new user by filling the details below
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 w-full max-w-5xl">
        {message.text && (
          <div
            className={`text-center font-medium mb-4 py-2 rounded-lg ${
              message.type === "success"
                ? "text-green-600 bg-green-50"
                : "text-red-600 bg-red-50"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 pr-10"
            />

            <div
              className="absolute inset-y-9 top-12 right-3 flex items-center cursor-pointer text-gray-600 hover:text-gray-900 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition-all cursor-pointer ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
