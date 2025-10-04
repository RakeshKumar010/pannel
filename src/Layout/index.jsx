// src/Layout.jsx
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from '../pages/AdminLogin'; 
import OrderManagement from '../pages/admin/OrderManagement'; 
import ViewOrder from '../pages/admin/ViewOrder';

const Layout = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>HOME</div>} />
        <Route path="/adsmin" element={<AdminLogin />} />
       
       
        <Route
          path="/orders"
          element={
            isAuthenticated() ? <OrderManagement /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/orders/:id"
          element={
            isAuthenticated() ? <ViewOrder /> : <Navigate to="/" replace />
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;