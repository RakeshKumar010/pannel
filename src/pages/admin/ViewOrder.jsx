// src/pages/admin/ViewOrder.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/global/admin/AdminSidebar";
import { ArrowLeft, User, Package, CreditCard, MapPin } from "lucide-react";

const ViewOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  // Mock Data (Used for demonstration, replace with API fetch)
  const orders = [
    {
      id: 1,
      customer: {
        fullName: "John Doe",
        mobile: "+919876543210",
        city: "Mumbai",
        state: "Maharashtra",
        address: "123 Main St, Andheri",
        pincode: "400058",
      },
      product: {
        name: "Combo of 1kg Kaju and 1 kg Badam",
        quantity: 1,
        total: 299,
      },
      payment: {
        method: "Credit Card",
        cardNumber: "XXXX-XXXX-XXXX-1234",
        expiry: "12/25",
        cvv: "***",
      },
      status: "Pending",
    },
    {
      id: 2,
      customer: {
        fullName: "Jane Smith",
        mobile: "+918765432109",
        city: "Delhi",
        state: "Delhi",
        address: "456 Park Ave, Connaught Place",
        pincode: "110001",
      },
      product: {
        name: "Combo of 500g Dates and 500g Walnuts",
        quantity: 1,
        total: 199,
      },
      payment: {
        method: "Debit Card",
        cardNumber: "XXXX-XXXX-XXXX-5678",
        expiry: "06/24",
        cvv: "***",
      },
      status: "Delivered",
    },
  ];

  useEffect(() => {
    const foundOrder = orders.find((o) => o.id === parseInt(id));
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // Navigate to the order list if ID is not found
      navigate("/orders");
    }
  }, [id, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Processing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Delivered":
        return "bg-teal-100 text-teal-800 border-teal-300"; // Updated to Teal
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Helper component for displaying detail rows
  const DetailItem = ({ icon: Icon, label, value }) => (
    <p className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0 text-sm">
      <span className="font-medium text-gray-500 flex items-center space-x-2">
        {Icon && <Icon size={16} className="text-teal-600" />}
        <span>{label}:</span>
      </span>{" "}
      <span className="font-semibold text-gray-800 text-right">{value}</span>
    </p>
  );

  if (!order) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex pt-10">
      <AdminSidebar />
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ml-0 sm:ml-64">
        <button
          onClick={() => navigate("/orders")}
          className="inline-flex items-center space-x-2 mb-6 text-teal-600 hover:text-teal-800 transition-colors font-medium text-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Orders List</span>
        </button>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Order #**{order.id}**
            </h1>
            <span
              className={`py-1 px-3 rounded-full text-sm font-bold border ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CARD 1: Customer Information */}
            <div className="p-5 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center space-x-2 border-b pb-2">
                <User size={20} className="text-teal-600" />
                Customer Details
              </h2>
              <DetailItem label="Full Name" value={order.customer.fullName} />
              <DetailItem label="Mobile" value={order.customer.mobile} />
              <DetailItem
                label="City / State"
                value={`${order.customer.city}, ${order.customer.state}`}
              />
              <DetailItem label="Pincode" value={order.customer.pincode} />
              <DetailItem
                icon={MapPin}
                label="Full Address"
                value={order.customer.address}
              />
            </div>

            {/* CARD 2: Product/Order Summary */}
            <div className="p-5 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center space-x-2 border-b pb-2">
                <Package size={20} className="text-teal-600" />
                Order Summary
              </h2>
              <DetailItem label="Product Name" value={order.product.name} />
              <DetailItem label="Quantity" value={order.product.quantity} />
              <DetailItem
                label="Total Amount"
                value={`₹${order.product.total}`}
                className="font-extrabold text-lg text-teal-700"
              />
            </div>

            {/* CARD 3: Payment Details */}
            <div className="p-5 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center space-x-2 border-b pb-2">
                <CreditCard size={20} className="text-teal-600" />
                Payment Info
              </h2>
              <DetailItem label="Method" value={order.payment.method} />
              <DetailItem
                label="Card Number"
                value={order.payment.cardNumber}
              />
              <DetailItem label="Expiry Date" value={order.payment.expiry} />
              <DetailItem
                label="Security Code (CVV)"
                value={order.payment.cvv}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
