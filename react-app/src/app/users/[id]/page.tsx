"use client"
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';

// todo add user interface
export default function EditUser() {
  const [user, setUser] = useState({ name: '', zipCode: '' });
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/users/${id}`)
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => console.error('Error fetching user:', error));
    }
  }, [id]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axiosInstance.put(`/users/${id}`, user)
      .then(() => router.push('/users'))
      .catch((error: object) => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Zip Code:
          <input
            type="text"
            value={user.zipCode}
            onChange={(e) => setUser({ ...user, zipCode: e.target.value })}
            required
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
