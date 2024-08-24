import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../server/apiService'; // Use named import

const SignupList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(); // Fetch users from backend
        setUsers(data.users); // Adjust based on your API response
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.email} {/* Adjust based on user fields */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SignupList;
