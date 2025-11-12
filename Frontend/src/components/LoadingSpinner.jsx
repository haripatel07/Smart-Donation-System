import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  className = '',
  text,
  ...props
}) => {
  const spinnerClasses = [
    'loading-spinner',
    `loading-spinner-${size}`,
    `loading-spinner-${color}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="loading-container" {...props}>
      <div className={spinnerClasses}>
        <div className="loading-spinner-circle"></div>
      </div>
      {text && <span className="loading-text">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;