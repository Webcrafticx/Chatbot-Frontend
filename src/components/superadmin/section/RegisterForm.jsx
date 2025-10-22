import React, { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Registered:", formData);
    setSubmitted(true);
  };

  return (
    <div className="p-5">
      {/* Header (same as Overview) */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Register New User</h2>
        <p className="text-sm text-gray-600 mt-1">
          Add a new user by filling the details below
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 w-full max-w-5xl">
        {submitted ? (
          <div className="text-center text-green-600 font-semibold text-lg py-10">
            ✅ Registration Successful!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
            >
              Register User
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
