import React from "react";
import { useNavigate } from "react-router-dom";

const Counter = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-50">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Counter Login</h2>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/milk-purchase")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Milk Purchasing
          </button>

          <button
            onClick={() => navigate("/milk-sell")}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Milk Selling
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
