'use client';

import React from 'react';
import { formatCurrency, getTypeColor } from '@/utils';

interface MoneyDisplayProps {
  amount: number;
  currency?: string;
  variant?: 'primary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

export const MoneyDisplay: React.FC<MoneyDisplayProps> = ({
  amount,
  currency = 'PEN',
  variant = 'primary',
  size = 'md',
  showLabel,
  label,
}) => {
  const sizeClasses = {
    sm: 'text-lg font-semibold',
    md: 'text-2xl font-bold',
    lg: 'text-3xl font-bold',
  };

  const colorClasses = {
    primary: 'text-primary-600',
    success: 'text-success-600',
    danger: 'text-danger-600',
    warning: 'text-warning-600',
  };

  const isNegative = amount < 0;

  return (
    <div className="flex flex-col">
      {showLabel && label && (
        <span className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</span>
      )}
      <span className={`${sizeClasses[size]} ${colorClasses[variant]}`}>
        {isNegative ? '-' : ''}
        {formatCurrency(Math.abs(amount), currency)}
      </span>
    </div>
  );
};
