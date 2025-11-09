import React from 'react';
import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', loading = false, children, className, ...props }) => {
  const baseClasses = "px-4 py-2 rounded-md font-semibold transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variantClasses = {
    primary: 'bg-accent text-light hover:bg-accent-hover',
    secondary: 'bg-secondary/60 text-light hover:bg-secondary border border-gray-700 hover:border-gray-600',
    danger: 'bg-red-600/90 text-light hover:bg-red-600',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
};

export default Button;