// src/components/global/admin/AdminSidebar.jsx
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Package, ShoppingCart, Users, LogOut } from 'lucide-react';

const AdminSidebar = () => {
 const navigate = useNavigate();
 const [isOpen, setIsOpen] = useState(false);

 const handleLogout = () => {
 localStorage.removeItem('authToken');
 navigate('/admin'); // Redirect to fixed /admin route
 };

 const toggleSidebar = () => {
 setIsOpen(!isOpen);
 };
  
 // Define navigation items with icons
 const navItems = [
 { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
 { to: "/products", icon: Package, label: "Products" },
 { to: "/orders", icon: ShoppingCart, label: "Orders" },
 { to: "/users", icon: Users, label: "Admins" },
 ];

 return (
 <>
 {/* Mobile Toggle Button */}
 <button
  className="sm:hidden fixed top-4 left-4 z-30 p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg transition-colors"
  onClick={toggleSidebar}
 >
  {isOpen ? <X size={20} /> : <Menu size={20} />}
 </button>

 {/* Sidebar */}
 <div
  className={`fixed top-0 left-0 h-full bg-white text-gray-800 shadow-2xl z-20 w-64 transform transition-transform duration-300 ${
    isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
  }`} // Changed bg-gray-900 to bg-white and text-white to text-gray-800
 >
  <div className="p-6 h-full flex flex-col justify-between">
  <div>
    <h2 className="text-xl font-extrabold text-teal-600 mb-8 tracking-wider uppercase">
      Admin Portal
    </h2> {/* Changed text-teal-400 to text-teal-600 for contrast */}
    <nav className="space-y-3">
      {navItems.map((item) => (
      <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) =>
       `flex items-center space-x-3 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
        ? 'bg-teal-50 text-teal-700 font-semibold shadow-sm border-l-4 border-teal-600' // Lighter active state
        : 'text-gray-600 hover:bg-gray-100 hover:text-teal-600' // Light hover state
       }`
      }
      onClick={() => setIsOpen(false)}
      >
      <item.icon size={18} />
      <span>{item.label}</span>
      </NavLink>
      ))}
    </nav>
  </div>
  
  {/* Logout Button (Remains visually striking) */}
  <button
  onClick={handleLogout}
  className="flex items-center justify-center space-x-2 w-full py-3 mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-lg transition-all duration-300 shadow-lg"
  >
  <LogOut size={18} />
  <span>Log Out</span>
  </button>
  </div>
 </div>

 {/* Overlay for mobile when sidebar is open */}
 {isOpen && (
  <div
  className="fixed inset-0 bg-black bg-opacity-70 z-10 sm:hidden"
  onClick={toggleSidebar}
  ></div>
 )}
 </>
 );
};

export default AdminSidebar;