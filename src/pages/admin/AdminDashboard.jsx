// src/pages/admin/AdminDashboard.jsx
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/global/admin/AdminSidebar';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
 // Mock data for dashboard statistics
 
 const stats = [
  { title: 'Total Products', value: 145, icon: Package, color: 'bg-teal-500' },
  { title: 'New Orders', value: 12, icon: ShoppingCart, color: 'bg-indigo-500' }, 
  { title: 'Total Users', value: 872, icon: Users, color: 'bg-pink-500' },
 ];

 const quickLinks = [
  { title: 'Manage Products', description: 'Add, edit, or remove products from the store.', to: '/products', color: 'bg-teal-600' },
  { title: 'Manage Orders', description: 'View and update customer orders.', to: '/orders', color: 'bg-indigo-600' },
 ];

 return (
  <div className="min-h-screen bg-gray-100 flex">
   <AdminSidebar />
   <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ml-0 sm:ml-64">
    <div className="w-full">
     <h1 className="text-3xl font-bold text-gray-800 mb-2">
      Dashboard
     </h1>
     <p className="text-lg text-gray-500 mb-8">
      Welcome , Here's an overview of your store.
     </p>

     {/* Stats Grid */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {stats.map((stat) => (
       <div 
        key={stat.title}
        className="bg-white p-5 rounded-xl shadow-lg flex items-center space-x-4 border-l-4 border-teal-500 transition-shadow hover:shadow-xl"
       >
        <div className={`p-3 rounded-full text-white ${stat.color}`}>
         <stat.icon size={24} />
        </div>
        <div>
         <p className="text-sm font-medium text-gray-500">{stat.title}</p>
         <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        </div>
       </div>
      ))}
     </div>
          
     {/* Quick Links */}
     <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {quickLinks.map((link) => (
       <Link 
        key={link.title}
        to={link.to}
        className={`p-6 rounded-xl text-white shadow-xl transition-transform transform hover:scale-[1.02] ${link.color}`}
       >
        <h3 className="text-xl font-bold mb-2">{link.title}</h3>
        <p className="text-sm opacity-90">{link.description}</p>
        <span className="mt-4 inline-block font-semibold border-b border-white border-opacity-50">Go Now &rarr;</span>
       </Link>
      ))}
     </div>
    </div>
   </div>
  </div>
 );
};

export default AdminDashboard;