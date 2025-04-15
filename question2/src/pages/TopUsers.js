// question2/src/pages/TopUsers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TopUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/users')
      .then(response => {
        const sortedUsers = response.data.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        setUsers(sortedUsers);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load users');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Top Users by Post Count</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="border p-4 rounded shadow">
            <img
              src={`https://picsum.photos/200?random=${user.id}`}
              alt="User"
              className="w-16 h-16 rounded-full mb-2"
            />
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p>Posts: {user.postCount}</p>
            <p>Comments: {user.totalComments}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopUsers;