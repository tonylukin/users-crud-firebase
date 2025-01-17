"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import UserForm from '@/components/UserForm';
import IUser, { IUserInput } from '@/interfaces/User';

export default function EditUser() {
  const [user, setUser] = useState<IUser|null>(null);
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
  }, []);

  const handleSubmit = (data: IUserInput|null) => {
    return new Promise<void>((resolve, reject) => {
      axiosInstance.put(`/users/${id}`, data)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.error('Error updating user:', error);
          reject();
        });
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit User #{user?.id}</h2>
      <UserForm onSubmit={handleSubmit} initialUser={user} />
    </div>
  );
}
