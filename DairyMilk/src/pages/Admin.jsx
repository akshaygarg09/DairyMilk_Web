import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-white to-gray-50">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Admin Panel</h2>
        <div className="space-y-4">
          <button onClick={()=>navigate("/admindashboard")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            View Reports
          </button>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Edit Rate Chart
          </button>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Manage Suppliers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
