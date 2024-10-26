import React from 'react'

const Input = ({
  type = 'text',
  options = [],
  placeholder = '',
  value,
  onChange,
  label = '',
  name,
  required = true,
  disabled = false,
  className = '',
  error = '',
}) => {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${disabled ? 'bg-gray-100' : 'bg-white'}`}
            disabled={disabled}
            required={required}
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'textarea':
        return (
          <textarea
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${disabled ? 'bg-gray-100' : 'bg-white'}`}
            disabled={disabled}
            required={required}
            rows={4}
          />
        )

      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={name}
            id={name}
            checked={value}
            onChange={onChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            disabled={disabled}
            required={required}
          />
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={name}
                  id={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  disabled={disabled}
                  required={required}
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )

      default:
        return (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${disabled ? 'bg-gray-100' : 'bg-white'}`}
            disabled={disabled}
            required={required}
          />
        )
    }
  }

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default Input
