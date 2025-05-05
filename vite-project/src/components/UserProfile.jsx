import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen pt-16">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-4 w-56 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-4 w-60 bg-gray-200 rounded mx-auto"></div>
          <p className="mt-4 text-indigo-600">Loading user data...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen pt-16">
        <div className="text-center p-6 bg-red-50 rounded-lg shadow">
          <p className="text-xl text-red-500">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-24">
      <h2 className="text-3xl font-mono text-center text-gray-800 mb-6 pb-3 border-b border-gray-200">
        User Profile
      </h2>
      <div className="space-y-6">
        <div className="flex items-center">
          <strong className="text-gray-700 w-32 font-mono">Name:</strong>
          <span className="text-gray-600">{user.name}</span>
        </div>
        <div className="flex items-center">
          <strong className="text-gray-700 w-32 font-mono">Username:</strong>
          <span className="text-gray-600">{user.username}</span>
        </div>
        <div className="flex items-center">
          <strong className="text-gray-700 w-32 font-mono">Email:</strong>
          <span className="text-gray-600">{user.email}</span>
        </div>
        <div className="flex items-center">
          <strong className="text-gray-700 w-32 font-mono">Company:</strong>
          <span className="text-gray-600">{user.company.name}</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;