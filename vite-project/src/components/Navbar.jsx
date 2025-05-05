import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    if (userId) {
      navigate(`/users/${userId}`);
    }
  };

  return (
    <nav className="bg-white shadow-xl p-4 fixed top-0 left-0 right-0 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6 text-indigo-500 font-medium">
          <Link to="/" className="hover:text-indigo-700 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-indigo-700 transition-colors">About</Link>
        </div>
        <div className="w-64 bg-gray-900">
          <select 
            id="user" 
            value={selectedUser} 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray"
          >
            <option value="" className="bg-gray-900">-- Choose a user --</option>
            {Array.from({ length: 3 }, (_, i) => (
              <option key={i} value={i + 1}>User {i + 1}</option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;