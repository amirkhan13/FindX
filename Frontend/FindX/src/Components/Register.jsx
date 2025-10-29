import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    Year: "First",
    course: "",
    avatar: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("username", formData.username);
    payload.append("email", formData.email);
    payload.append("password", formData.password);
    payload.append("Year", formData.Year);
    payload.append("course", formData.course);
    payload.append("role", formData.role);
    payload.append("avatar", formData.avatar);

    try {
      await axios.post(`https://findx-zvqm.onrender.com/api/v1/users/register`, payload, {
        headers: { "Content-Type": "multipart/form-data" },

      }, { withCredentials: true });

      setErrorMessage("");
      setSuccessMessage("Registered successfully! Please login.");
      setTimeout(() => setSuccessMessage(""), 3000);

      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        role: "user",
        Year: "First",
        course: "",
        avatar: null,
      });
      navigate("/login");
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 409 && message === "User Already Exists!") {
        setErrorMessage("User already exists. Please login.");
      } else {
        setErrorMessage(message || "Something went wrong. Try again.");
      }
      setSuccessMessage("");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center space-x-8">
        {/* Left Side - Logo Section */}
        <div className="text-center">
          <img src="/imgs/logo.avif" alt="FindX" className="w-48 mx-auto" />
          <p className="text-orange-500 font-semibold -mt-[2.5rem]">
            Connecting Lost Items <br /> with Their Rightful Owners
          </p>
        </div>

        {/* Divider */}
        <div className="border-l-4 border-gray-300 h-48"></div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">
            Register
          </h2>

          {errorMessage && (
            <p className="text-red-600 text-sm mb-3 text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm mb-3 text-center">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="w-1/4 text-sm font-medium text-gray-700 mr-2">
                Name:
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                className="w-3/4 border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Username */}
            <div className="flex items-center mb-4">
              <label htmlFor="username" className="w-1/4 text-sm font-medium text-gray-700 mr-2">
                Username:
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-3/4 border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div className="flex items-center mb-4">
              <label htmlFor="email" className="w-1/4 text-sm font-medium text-gray-700 mr-2">
                Email:
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-3/4 border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Course */}
            <div className="flex items-center mb-4">
              <label htmlFor="course" className="w-1/4 text-sm font-medium text-gray-700 mr-2">
                Course:
              </label>
              <input
                id="course"
                type="text"
                name="course"
                placeholder="Course"
                value={formData.course}
                onChange={handleChange}
                className="w-3/4 border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Year */}
            <div className="flex items-center mb-4">
              <label htmlFor="Year" className="w-1/4 text-sm font-medium text-gray-700 mr-2">
                Year:
              </label>
              <select
                id="Year"
                name="Year"
                value={formData.Year}
                onChange={handleChange}
                className="w-3/4 border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="First">First</option>
                <option value="Second">Second</option>
              </select>
            </div>

            {/* Password */}
            <div className="flex items-center mb-4">
              <label htmlFor="password" className="w-1/4 text-sm font-medium text-gray-700 mr-2">
                Password:
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-3/4 border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Role */}
            <div className="flex items-center mb-4">
              <label htmlFor="role" className="w-1/4 text-sm font-medium text-gray-700 mr-2">
                Role:
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-3/4 border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Avatar */}
            <div className="flex items-center mb-4">
              <label htmlFor="avatar" className="w-1/4 text-sm font-medium text-gray-700 mr-2">
                Avatar:
              </label>
              <input
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="w-3/4 text-gray-700 p-2 rounded-md"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-400 transition"
            >
              Register
            </button>

            {/* Already have an account? */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-500 hover:underline font-medium">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
