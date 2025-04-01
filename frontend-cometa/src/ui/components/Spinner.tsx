import React from 'react';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'white' | 'gray';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}) => {
  const sizeClasses = {
    xs: 'h-4 w-4',
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-400'
  };

  return (
    <div 
      className={`inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

interface SpinnerWithTextProps extends SpinnerProps {
  text?: string;
  textPosition?: 'left' | 'right' | 'top' | 'bottom';
}

export const SpinnerWithText: React.FC<SpinnerWithTextProps> = ({ 
  text = 'Cargando...',
  textPosition = 'right',
  ...spinnerProps 
}) => {
  const flexDirection = {
    right: 'flex-row',
    left: 'flex-row-reverse',
    top: 'flex-col-reverse',
    bottom: 'flex-col'
  }[textPosition];

  const spacing = {
    right: 'ml-2',
    left: 'mr-2',
    top: 'mt-2',
    bottom: 'mb-2'
  }[textPosition];

  return (
    <div className={`inline-flex items-center ${flexDirection}`}>
      <Spinner {...spinnerProps} />
      <span className={`${spacing} text-sm ${spinnerProps.color === 'white' ? 'text-white' : 'text-gray-600'}`}>
        {text}
      </span>
    </div>
  );
};