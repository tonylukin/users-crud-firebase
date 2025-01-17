"use client"
import { useEffect, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import Link from 'next/link';
import IUser from '@/interfaces/User';
import UserList from '@/components/UserList';
import Loader from '@/components/Loader';
import Alert from '@/components/Alert';

export default function UserListPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);

  const fetchList = () => {

    setLoading(true);

    axiosInstance.get('/users')
      .then((response) => {
          const users = [];
          for (const id of Object.keys(response.data)) {
              users.push(response.data[id]);
          }
          setUsers(users);
      })
      .catch((error) => setError('Error fetching users: ' + error))
      .finally(() => setLoading(false))
    ;
  }

  useEffect(() => {
    fetchList();
  }, []);

  const handleDelete = async (id: String|null) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.delete(`/users/${id}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete user');
      }
      fetchList();

    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {error && <Alert type="error" message={error} />}

      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <Link href="/users/create">
        <button className="bg-amber-500 text-blue-900 px-4 py-2 rounded-md hover:bg-amber-600 focus:outline-none focus:ring focus:ring-amber-300">Create User</button>
      </Link>

      {loading && <Loader />}
      {!loading && <UserList users={users} onDelete={handleDelete} />}
    </div>
  );
}
