import { IUserInput } from '@/interfaces/User';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

export default function UserForm({ onSubmit, initialUser = null }: {
  onSubmit: (data: IUserInput | null) => Promise<void>,
  initialUser?: IUserInput | null
}) {
  const [user, setUser] = useState<IUserInput | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    await onSubmit(user);
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader/>}
      {!loading && (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Name:
            <input
              type="text"
              value={user?.name ? user.name : ''}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
              // @ts-ignore
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Zip Code:
            <input
              type="text"
              value={user?.zipCode ? user.zipCode : ''}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
              // @ts-ignore
              onChange={(e) => setUser({ ...user, zipCode: e.target.value })}
            />
          </label>
          <br/>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300"
          >Submit
          </button>
        </form>
      )}
    </>
  );
}
