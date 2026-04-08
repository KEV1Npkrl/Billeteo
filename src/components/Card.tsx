'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', shadow = 'md', children, ...props }, ref) => {
    const shadowStyles = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    };

    return (
      <div
        ref={ref}
        className={`bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 ${shadowStyles[shadow]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
