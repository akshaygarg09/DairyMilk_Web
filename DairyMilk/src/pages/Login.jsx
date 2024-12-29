import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; // Import Axios

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make API call using Axios
      const response = await axios.post("http://localhost:3000/api/login", { username:name, password });

      const { token, role } = response.data;

      // Save the JWT token in localStorage
      localStorage.setItem("jwt_token", token);

      // Check the role and navigate accordingly
      if (role === "counter") {
        navigate("/counter");
        toast.success("Counter Login Successful");
      } else if (role === "admin") {
        navigate("/admin");
        toast.success("Admin Login Successful");
      } else if(role === "collector"){
        navigate("/collectordashboard");
        toast.success("Collector Login Successful");
      }else {
        toast.error("Unknown role. Please contact support.");
      }
    } catch (error) {
      // Handle errors from Axios
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        console.error("Error logging in:", error.message);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Code Number"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Not registered?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline hover:text-blue-600"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
