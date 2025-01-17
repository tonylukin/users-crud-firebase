"use client"
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import UserForm from '@/components/UserForm';
import { IUserInput } from '@/interfaces/User';

export default function CreateUser() {
  const router = useRouter();

  const handleSubmit = (data: IUserInput|null) => {
    return new Promise<void>((resolve, reject) => {
      axiosInstance.post('/users', data)
        .then(() => {
          router.push('/users');
          resolve();
        })
        .catch((error) => {
          console.error('Error creating user:', error);
          reject();
        });
    })
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Create user</h2>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
