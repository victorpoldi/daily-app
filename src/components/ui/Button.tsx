import { cn } from '@/lib/utils';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={cn("bg-gray-700 px-4 py-2 rounded hover:bg-gray-400 hover:text-gray-900", className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;