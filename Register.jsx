import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [codeNo, setCodeNo] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/register', {
        fullName,
        codeNo,
        phoneNo,
        password,
      });
      if (response.data.success) {
        alert('Registration successful');
        window.location.href = '/login';
      } else {
        alert('Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error during registration');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Code Number"
        value={codeNo}
        onChange={(e) => setCodeNo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
