import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ManagerDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/login');
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users', {
          withCredentials: true
        });
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch users', error);
        setError('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getUserStats = () => {
    return {
      total: users.length,
      managers: users.filter(u => u.role === 'manager').length,
      users: users.filter(u => u.role === 'user').length
    };
  };

  const stats = getUserStats();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>
          <button 
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* User Management Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Management</h2>
            
            {loading ? (
              <div className="text-center py-4">Loading users...</div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Role</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <span className="font-medium">{user.name}</span>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span>{user.email}</span>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <span 
                          className={`
                            px-3 py-1 rounded-full text-xs 
                            ${user.role === 'admin' ? 'bg-green-200 text-green-800' : 
                              user.role === 'manager' ? 'bg-blue-200 text-blue-800' : 
                              'bg-yellow-200 text-yellow-800'}
                          `}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center space-x-3">
                          <button className="text-blue-500 hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Dashboard Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Statistics Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">User Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Users</span>
                <span className="font-bold text-blue-600">{stats.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Managers</span>
                <span className="font-bold text-green-600">{stats.managers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Regular Users</span>
                <span className="font-bold text-yellow-600">{stats.users}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                Add New User
              </button>
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                Generate Report
              </button>
              <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition">
                Manage Roles
              </button>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">New user registered</span>
                </div>
                <span className="text-xs text-gray-500">2h ago</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm">Role updated</span>
                </div>
                <span className="text-xs text-gray-500">5h ago</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm">User deleted</span>
                </div>
                <span className="text-xs text-gray-500">1d ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;