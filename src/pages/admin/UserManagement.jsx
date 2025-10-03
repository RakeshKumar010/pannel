// src/pages/admin/UserManagement.jsx
import AdminSidebar from "../../components/global/admin/AdminSidebar";
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const UserManagement = () => { 
  const [users, setUsers] = useState([
    { id: 1, username: "admin123", email: "admin@example.com", role: 'Super Admin' },
    { id: 2, username: "editor", email: "editor@example.com", role: 'Editor' },
    { id: 3, username: "viewer", email: "viewer@example.com", role: 'Viewer' },
  ]);

  // Mock handlers for actions
  const handleEdit = (id) => console.log(`Edit user ${id}`);
  const handleDelete = (id) => setUsers(users.filter(u => u.id !== id));
  const handleAddAdmin = (e) => {
    e.preventDefault();
    console.log("Adding new admin...");
    // Logic to reset form and add admin
  };
 
  return (
   <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ml-0 sm:ml-64">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Admin User Management
          </h1>

          {/* User Table */}
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Admin Accounts ({users.length})</h2>
          <div className="overflow-x-auto rounded-lg border">
            <div className="grid grid-cols-5 gap-4 py-3 px-4 bg-gray-50 text-gray-600 font-bold text-sm border-b">
              <div className='hidden sm:block'>ID</div>
              <div>Username</div>
              <div className='hidden sm:block'>Role</div>
              <div>Email</div>
              <div className="text-center">Actions</div>
            </div>
            {users.map((user, index) => (
              <div
                key={user.id}
                className={`grid grid-cols-5 gap-4 items-center py-4 px-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b text-sm`}
              >
                <div className="font-medium text-gray-600 hidden sm:block">{user.id}</div>
                <div className="font-semibold text-gray-800">{user.username}</div>
                <div className="text-gray-600 hidden sm:block">
                    <span className="py-1 px-2 rounded-full bg-teal-100 text-teal-800 text-xs font-medium">
                        {user.role}
                    </span>
                </div>
                <div className="font-medium text-gray-700 truncate">{user.email}</div>
                <div className="text-center space-x-2">
                  <button onClick={() => handleEdit(user.id)} className="text-blue-500 hover:text-blue-700 p-1 rounded transition-colors">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 p-1 rounded transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Admin Form */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-5 flex items-center space-x-2">
                <UserPlus size={20} className="text-teal-600" />
              Add New Admin
            </h3>
            <form onSubmit={handleAddAdmin} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-shadow text-base shadow-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-shadow text-base shadow-sm"
                  required
                />
                <input
                  type="password"
                  placeholder="Password (Min 8 chars)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-shadow text-base shadow-sm"
                  minLength={8}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 self-start"
              >
                Add Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;