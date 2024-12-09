import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import CounterDashboard from '../components/CounterDashboard';
import CollectionDashboard from '../components/CollectionDashboard';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/counter-dashboard" element={<CounterDashboard />} />
        <Route path="/collection-dashboard" element={<CollectionDashboard />} />
        {/* Add other routes as necessary */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
