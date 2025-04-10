import { cn } from '@/lib/utils';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn("bg-gray-700 px-2 py-2 rounded hover:bg-gray-400 hover:text-gray-900", className)}
      {...props}
    />
  );
};

export default Input;