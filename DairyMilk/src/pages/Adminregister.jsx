import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; // Import Axios

const Adminregister = () => {
  const [username, setusername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Make API call to the backend
      const response = await axios.post("http://localhost:3000/api/adminregister", {
        codenumber:username,
        phone,
        password,
        role: "admin", // Ensure role is passed as "counter"
      });
  
      // Extract token from response
      const { token } = response.data;
  
      // Save token to local storage
      if (token) {
        localStorage.setItem('userToken', token);
      }
  
      toast.success(response.data.message || "Registered successfully");
  
      // Redirect to the counter page after successful registration
      navigate("/admin");
    } catch (error) { // Log full error for debugging
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Admin Register
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
            onClick={handleRegister}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Register
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/"
            className="text-blue-500 hover:underline hover:text-blue-600"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Adminregister;
