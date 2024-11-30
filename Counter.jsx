import React from "react";
import { useNavigate } from "react-router-dom";

const Counter = () => {
  const navigate = useNavigate();

  return (
    <div className="counter-container">
      <h2>Counter Login</h2>
      <button onClick={() => navigate("/milk-purchase")}>Milk Purchasing</button>
      <button onClick={() => navigate("/milk-sell")}>Milk Selling</button>
    </div>
  );
};

export default Counter;
