import { useState } from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export default function Alert({ type, message, onClose }: AlertProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) {
    return null
  }

  const typeStyles: Record<string, string> = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
  };

  return (
    <div
      className={`flex items-center border-l-4 p-4 rounded shadow-md ${typeStyles[type]} mb-4`}
      role="alert"
    >
      <div className="flex-1">
        <p>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className="ml-4 text-lg font-bold text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &times;
        </button>
      )}
    </div>
  );
}
