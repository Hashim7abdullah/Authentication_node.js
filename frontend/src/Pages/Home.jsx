import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users/get-users")
      .then((result) => {
        setUsers(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 p-2 sm:p-4 md:p-6">
      <div className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
        {/* Header Section - Responsive Layout */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 w-full sm:w-auto text-center sm:text-left">
            User Management
          </h1>
          <Link
            to="/create"
            className="w-full sm:w-auto flex justify-center items-center bg-green-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-green-600 transition-colors space-x-2 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm sm:text-base">Create User</span>
          </Link>
        </div>

        {/* Table - Fully Responsive */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                {["Name", "Email", "Role", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="text-left p-2 sm:p-4 border-b border-gray-200 font-semibold text-gray-700 uppercase tracking-wider text-xs sm:text-sm"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <td className="p-2 sm:p-4 border-b border-gray-200 text-gray-800 font-medium text-sm sm:text-base">
                    {user.name}
                  </td>
                  <td className="p-2 sm:p-4 border-b border-gray-200 text-gray-600 text-sm sm:text-base">
                    {user.email}
                  </td>
                  <td className="p-2 sm:p-4 border-b border-gray-200 text-gray-800 text-sm sm:text-base">
                    {user.role}
                  </td>
                  <td className="p-2 sm:p-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Link
                        to={`/update/${user._id}`}
                        className="w-full sm:w-auto bg-blue-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-blue-600 transition-colors group-hover:scale-105 transform duration-200 shadow-md flex items-center justify-center space-x-1 text-xs sm:text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <span>Edit</span>
                      </Link>
                      <Link
                        to={`/delete/${user._id}`}
                        className="w-full sm:w-auto bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-red-600 transition-colors group-hover:scale-105 transform duration-200 shadow-md flex items-center justify-center space-x-1 text-xs sm:text-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Delete</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State - Responsive */}
        {users.length === 0 && (
          <div className="text-center py-4 sm:py-6 text-sm sm:text-base text-gray-500">
            No users found. Create a new user to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
