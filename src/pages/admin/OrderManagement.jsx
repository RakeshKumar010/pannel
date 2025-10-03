// src/pages/admin/OrderManagement.jsx
import { useState, useMemo } from 'react';
import AdminSidebar from '../../components/global/admin/AdminSidebar';
import { ShoppingCart, Eye, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderManagement = () => {
 // Retaining the original mock data structure
 const [orders, setOrders] = useState([
  {
   id: 1,
   customer: {
    fullName: 'John Doe',
    mobile: '+919876543210',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: '123 Main St, Andheri', // Not displayed in table body
    pincode: '400058', // Not displayed in table body
   },
   product: {
    name: 'Combo of 1kg Kaju and 1 kg Badam', // Not displayed in table body
    quantity: 1, // Not displayed in table body
    total: 299,
   },
   payment: {
    method: 'Credit Card', // Not displayed in table body
    cardNumber: 'XXXX-XXXX-XXXX-1234',
    expiry: '12/25',
    cvv: '***',
   },
   status: 'Pending',
  },
  {
   id: 2,
   customer: {
    fullName: 'Jane Smith',
    mobile: '+918765432109',
    city: 'Delhi',
    state: 'Delhi', // Not displayed in table body
    address: '456 Park Ave, Connaught Place', // Not displayed in table body
    pincode: '110001', // Not displayed in table body
   },
   product: {
    name: 'Combo of 500g Dates and 500g Walnuts', // Not displayed in table body
    quantity: 1, // Not displayed in table body
    total: 199,
   },
   payment: {
    method: 'Debit Card', // Not displayed in table body
    cardNumber: 'XXXX-XXXX-XXXX-5678',
    expiry: '06/24',
    cvv: '***',
   },
   status: 'Delivered',
  },
 ]);
 
 const [searchTerm, setSearchTerm] = useState('');

 const handleStatusChange = (orderId, newStatus) => {
  setOrders((prevOrders) =>
   prevOrders.map((order) =>
    order.id === orderId ? { ...order, status: newStatus } : order
   )
  );
  console.log(`Order ${orderId} status updated to ${newStatus}`);
 };

 const getStatusColor = (status) => {
  switch (status) {
   case 'Pending':
    return 'bg-yellow-100 text-yellow-800 border-yellow-300';
   case 'Processing':
    return 'bg-blue-100 text-blue-800 border-blue-300';
   case 'Delivered':
    return 'bg-teal-100 text-teal-800 border-teal-300';
   case 'Cancelled':
    return 'bg-red-100 text-red-800 border-red-300';
   default:
    return 'bg-gray-100 text-gray-800 border-gray-300';
  }
 };

 // Filter orders based on the search term
 const filteredOrders = useMemo(() => {
  if (!searchTerm) return orders;
  const lowerCaseSearch = searchTerm.toLowerCase();

  return orders.filter(order => 
   // Search logic remains broad to cover most fields
   String(order.id).includes(lowerCaseSearch) ||
   order.customer.fullName.toLowerCase().includes(lowerCaseSearch) ||
   order.product.name.toLowerCase().includes(lowerCaseSearch) ||
   order.customer.city.toLowerCase().includes(lowerCaseSearch) ||
   order.status.toLowerCase().includes(lowerCaseSearch)
  );
 }, [orders, searchTerm]);


 return (
  <div className="min-h-screen  bg-gray-100 flex overflow-hidden">
   <AdminSidebar />
   {/* Allow for horizontal scrolling on the main content area */}
   <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ml-0 sm:ml-64 overflow-x-auto">
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-w-max">
     
     <div className="flex justify-between items-center mb-6 border-b pb-4">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
          <ShoppingCart size={24} className="text-teal-600" />
        <span>Order Management</span>
      </h1>
     </div>
      
     {/* Search Box */}
     <div className="mb-6 relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
       type="text"
       placeholder="Search orders by ID, Customer Name, Product, or City..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
       className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-shadow shadow-sm"
      />
     </div>

     <div className="overflow-x-auto rounded-lg border">
      <table className="w-full table-auto border-collapse">
       <thead className="sticky top-0 bg-gray-100 z-10 shadow-sm">
        <tr className="text-gray-600 font-bold text-xs sm:text-sm">
         {/* --- Custom/Required Columns --- */}
         <th className="py-3 px-3 text-left min-w-[60px]">ID</th>
         <th className="py-3 px-3 text-left min-w-[150px]">Customer</th>
         <th className="py-3 px-3 text-left min-w-[100px]">Mobile</th> 
         <th className="py-3 px-3 text-right min-w-[80px]">Total</th> 
         <th className="py-3 px-3 text-left min-w-[120px]">Card No.</th>
         <th className="py-3 px-3 text-left min-w-[80px]">Expiry</th>
         <th className="py-3 px-3 text-left min-w-[60px]">CVV</th> 
         <th className="py-3 px-3 text-left min-w-[80px]">City</th> 
         <th className="py-3 px-3 text-center min-w-[110px]">Status</th>
         <th className="py-3 px-3 text-center min-w-[60px]">Action</th>
        </tr>
       </thead>
       <tbody>
        {filteredOrders.length > 0 ? 
         filteredOrders.map((order, index) => (
          <tr
           key={order.id}
           className={`border-b border-gray-100 hover:bg-teal-50/50 transition-colors duration-200 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
           }`}
          >
           {/* Order ID */}
          <td className="py-3 px-3 font-bold text-gray-800 text-xs sm:text-sm border-r border-gray-100">
            #{order.id}
          </td>
           {/* Customer */}
          <td className="py-3 px-3 font-medium text-gray-700 truncate text-xs sm:text-sm border-r border-gray-100" title={order.customer.fullName}>
            {order.customer.fullName}
          </td>
           {/* Mobile */}
          <td className="py-3 px-3 text-gray-600 truncate text-xs sm:text-sm border-r border-gray-100">
            {order.customer.mobile}
          </td>
           {/* Total */}
          <td className="py-3 px-3 text-right font-bold text-teal-700 text-xs sm:text-sm border-r border-gray-100">
            ₹{order.product.total}
          </td>
           {/* Card No. */}
          <td className="py-3 px-3 text-gray-600 truncate text-xs sm:text-sm border-r border-gray-100">
            {order.payment.cardNumber}
          </td>
           {/* Expiry */}
          <td className="py-3 px-3 text-gray-600 text-xs sm:text-sm border-r border-gray-100">
            {order.payment.expiry}
          </td>
           {/* CVV */}
          <td className="py-3 px-3 text-gray-600 text-xs sm:text-sm border-r border-gray-100">
            {order.payment.cvv}
          </td>
           {/* City */}
          <td className="py-3 px-3 text-gray-600 truncate text-xs sm:text-sm border-r border-gray-100">
            {order.customer.city}
          </td>
          
           {/* Status Dropdown */}
          <td className="py-3 px-3 text-center border-r border-gray-100">
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
              className={`appearance-none py-1 px-3 border rounded-full text-xs font-semibold focus:ring-1 cursor-pointer transition-colors ${getStatusColor(order.status)}`}
              style={{ paddingRight: '1.5rem' }}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </td>
          
           {/* Action Button */}
          <td className="py-3 px-3 text-center">
            <Link
              to={`/orders/${order.id}`}
              className="text-teal-600 hover:text-teal-800 p-2 rounded-full transition-colors inline-flex items-center justify-center"
              title="View Order Details"
            >
              <Eye size={18} />
            </Link>
          </td>
         </tr>
        )) : (
            <tr>
              <td colSpan="10" className="py-8 text-center text-gray-500">
                No orders found matching your search term.
              </td>
            </tr>
        )}
       </tbody>
      </table>
     </div>
    </div>
   </div>
  </div>
 );
};

export default OrderManagement;