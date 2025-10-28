import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function Login() {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(`${__API_URL__}/users/login`, data, {
        withCredentials: true,
      });

      const { accessToken, user } = res.data.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage("Invalid Credentials!!");
        } else if (error.response.status === 400) {
          setErrorMessage("Email is required");
        } else {
          setErrorMessage("Internal Server Error");
        }
      } else {
        setErrorMessage("Network Error");
      }
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center space-x-8">
        {/* Logo Section */}
        <div className="text-center">
          <img src="/imgs/logo.avif" alt="FindX" className="w-48 mx-auto" />
          <p className="text-orange-500 font-semibold -mt-[2.5rem]">
            Connecting Lost Items <br /> with Their Rightful Owners
          </p>
        </div>

        {/* Divider */}
        <div className="border-l-4 border-gray-300 h-48"></div>

        {/* Login Form */}
        <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">
            Login
          </h2>

          {errorMessage && (
            <p className="text-red-600 text-sm mb-3 text-center">{errorMessage}</p>
          )}

          <form onSubmit={handleLogin}>
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
                value={email}
                onChange={handleEmailChange}
                className="w-3/4 border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
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
                value={password}
                onChange={handlePasswordChange}
                className="w-3/4 border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-400 transition"
            >
              Login
            </button>

            {/* Don't have an account? */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-orange-500 hover:underline font-medium">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
