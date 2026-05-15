import React from "react";

export default function SelectInput({
  label,
  value,
  onChange,
  options = [],
  description,
  required = false,
  placeholder,
  disabled = false,
}) {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-gray-900  text-sm sm:text-base font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Select Input */}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`md:w-full w-11/12 border rounded-md px-3 py-2 text-sm sm:text-base bg-gray-100  font-sans outline-none transition
          ${disabled 
            ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed" 
            : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
          }
        `}
      >
        <option value="">
          {placeholder ? placeholder : `Select ${label}`}
        </option>

        {options.length > 0 ? (
          options.map((opt, idx) => (
            <option key={idx} value={opt} className="text-gray-900 dark:text-gray-100">
              {opt}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>

      {/* Description */}
      {description && (
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-xs sm:text-sm font-light">
          {description}
        </p>
      )}
    </div>
  );
}
