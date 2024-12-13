import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Counter from "./pages/Counter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from "./pages/Admin";
import Adminregister from "./pages/Adminregister";
import AdminDashboard from "./pages/AdminDashboard";
import MilkPurchase from "./pages/MilkPurchase";
import CollectionDashboard from "./pages/CollectionDashboard";


function App() {
  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminregister" element={<Adminregister/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/milkpurchase" element={<MilkPurchase/>}/>
        <Route path="/collectordashboard" element={<CollectionDashboard/>}/>
        {/* <Route path="/milksell" element={<MilkSell/>}/> */}
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
