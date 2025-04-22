
import React from 'react';

export function LoadingSpinner({ 
  size = 'md', 
  color = 'text-indigo-500', 
  fullScreen = false 
}) {
  const sizeClasses: any = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const spinnerContent = (
    <div className={`${sizeClasses[size]} ${color} animate-spin`}>
      <svg fill="currentColor" viewBox="0 0 24 24">
        <path 
          opacity=".25" 
          d="M12 4a8 8 0 0 1 8 8h4a12 12 0 0 0-12-12v4z"
        />
        <path 
          d="M20 12a8 8 0 0 1-8 8v4a12 12 0 0 0 12-12h-4z" 
        />
      </svg>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center space-y-4">
          {spinnerContent}
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return spinnerContent;
}