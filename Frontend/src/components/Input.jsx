import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
  label,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  size = 'md',
  variant = 'outlined',
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const inputClasses = [
    'input',
    `input-${variant}`,
    `input-${size}`,
    error && 'input-error',
    success && 'input-success',
    disabled && 'input-disabled',
    leftIcon && 'input-with-left-icon',
    rightIcon && 'input-with-right-icon',
    fullWidth && 'input-full-width',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'input-container',
    fullWidth && 'input-container-full-width'
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}

      <div className="input-wrapper">
        {leftIcon && (
          <div className="input-icon input-icon-left">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />

        {rightIcon && (
          <div className="input-icon input-icon-right">
            {rightIcon}
          </div>
        )}
      </div>

      {(error || success || helperText) && (
        <div className="input-message">
          {error && <span className="input-error-text">{error}</span>}
          {success && <span className="input-success-text">{success}</span>}
          {helperText && !error && !success && (
            <span className="input-helper-text">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;