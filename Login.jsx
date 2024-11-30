import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("counter");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Placeholder authentication logic
    if (phone === "123" && password === "123") {
      if (role === "counter") navigate("/counter");
      else if (role === "admin") navigate("/admin");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="counter">Counter Login</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin}>Login</button>
      <p>
        Not registered? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
