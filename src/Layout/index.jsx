// src/Layout.jsx
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProductManagement from '../pages/admin/ProductManagement';
import OrderManagement from '../pages/admin/OrderManagement';
import UserManagement from '../pages/admin/UserManagement';
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
          path="/dashboard"
          element={
            isAuthenticated() ? <AdminDashboard /> : <Navigate to="/adsmin" replace />
          }
        />
        <Route
          path="/products"
          element={
            isAuthenticated() ? <ProductManagement /> : <Navigate to="/adsmin" replace />
          }
        />
        <Route
          path="/orders"
          element={
            isAuthenticated() ? <OrderManagement /> : <Navigate to="/adsmin" replace />
          }
        />
        <Route
          path="/orders/:id"
          element={
            isAuthenticated() ? <ViewOrder /> : <Navigate to="/adsmin" replace />
          }
        />
        <Route
          path="/users"
          element={
            isAuthenticated() ? <UserManagement /> : <Navigate to="/adsmin" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;