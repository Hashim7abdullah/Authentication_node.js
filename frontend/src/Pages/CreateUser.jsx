import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/users/create-users", {
        name,
        email,
        role,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create New User</h1>
          <Link
            to="/"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center space-x-2 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>Back to List</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="Name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label
              htmlFor="Role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Role
            </label>
            <input
              type="text"
              id="Role"
              name="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter Role"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-500 text-white px-4 py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Create User</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
