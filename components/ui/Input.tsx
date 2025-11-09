
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const baseClasses = "w-full px-3 py-2 bg-secondary/80 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-light transition-colors";
  
  return (
    <input
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
};

export default Input;