import Link from 'next/link';
import IUser from '@/interfaces/User';

export default function UserList({ users, onDelete }: {
  users: IUser[],
  onDelete: (userId: string|null) => void
}) {

  return (
    <ul className="divide-y divide-gray-200">
      {users.map((user) => (
        <li key={user.id} className="flex justify-between py-4">
          <span className="font-medium"><strong>{user.name}</strong> - {user.zipCode}</span>
          <div>
            <Link href={`/users/${user.id}`}>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mr-2">Edit
              </button>
            </Link>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
              onClick={() => onDelete(user.id)}
            >Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
