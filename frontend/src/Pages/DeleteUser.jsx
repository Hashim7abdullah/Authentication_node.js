import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      // Send DELETE request to backend
      await axios.delete(`http://localhost:4000/api/users/delete-users/${id}`);
      
      // Close modal and redirect to home page
      setIsModalOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
      // Optionally, show an error message to the user
      alert('Failed to delete user. Please try again.');
    }
  };

  const handleCancel = () => {
    // Close modal and go back to home page
    setIsModalOpen(false);
    navigate('/');
  };

  // If modal is closed, return null
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Delete User</h2>
        <p className="mb-6 text-gray-600">Are you sure you want to delete this user?</p>
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;