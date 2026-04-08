'use client';

import React from 'react';
import { formatPercentage } from '@/utils';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  max,
  label,
  showPercentage = true,
  variant = 'primary',
}) => {
  const percentage = (current / max) * 100;

  const colorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    danger: 'bg-danger-600',
  };

  const getVariantByPercentage = (): typeof variant => {
    if (percentage <= 50) return 'success';
    if (percentage <= 75) return 'warning';
    return 'danger';
  };

  const activeVariant = variant === 'primary' ? getVariantByPercentage() : variant;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {formatPercentage(percentage / 100)}
            </span>
          )}
        </div>
      )}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[activeVariant]} transition-all duration-300`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};
