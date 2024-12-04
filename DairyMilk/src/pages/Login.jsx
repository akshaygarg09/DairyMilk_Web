import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("counter");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Placeholder authentication logic
    if (phone === "123" && password === "123") {
      if (role === "counter") {
        navigate("/counter");
        toast.success("Counter Login Successfull");
      }
      else if (role === "admin") {
        navigate("/admin");
        toast.success("Admin Login Successfull");
      }
    } else {
      toast.error("Invalid credentials!");
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

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="counter">Counter Login</option>
            <option value="admin">Admin</option>
          </select>

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
