"use client"
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import Link from 'next/link';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = () => {
    axiosInstance.get('/users')
      .then((response) => {
          const users = [];
          for (const id of Object.keys(response.data)) {
              users.push(response.data[id]);
          }
          setUsers(users);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }

  useEffect(() => {
    fetchList();
  }, []);

  const handleDelete = async (id: Number) => {
    setLoading(true);
    // setError(null);
    try {
      const response = await axiosInstance.delete(`/users/${id}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete user');
      }
      fetchList();

    } catch (err) {
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <Link href="/users/create">
        <button>Create User</button>
      </Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.zipCode}
            <Link href={`/users/${user.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(user.id)} disabled={loading}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
