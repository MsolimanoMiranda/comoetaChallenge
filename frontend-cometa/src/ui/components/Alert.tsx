import React from 'react';
import { twMerge } from 'tailwind-merge';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message, className }) => {
  const baseClasses = 'p-4 rounded-md border-l-4';
  
  const typeClasses = {
    success: 'bg-green-50 border-green-500 text-green-700',
    error: 'bg-red-50 border-red-500 text-red-700',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-700',
    info: 'bg-blue-50 border-blue-500 text-blue-700'
  };

  return (
    <div className={twMerge(baseClasses, typeClasses[type], className)}>
      <p>{message}</p>
    </div>
  );
};