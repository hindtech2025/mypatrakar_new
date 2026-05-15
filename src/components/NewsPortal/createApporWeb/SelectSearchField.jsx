import Select from "react-select";

export const SelectSearchField = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error,
  loading = false,
  disabled = false,
}) => {
  const formattedOptions = options?.map((opt) => ({
    value: opt.id || opt.value,
    label: opt.language || opt.label || opt.name || opt,
  }));

  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Select
        inputId={name}
        name={name}
        isDisabled={disabled || loading}
        options={formattedOptions}
        value={formattedOptions?.find((o) => o.value === value) || null}
        isSearchable={true}
        placeholder={loading ? "Loading..." : `Select ${label}`}
        classNamePrefix="react-select"
        onChange={(selectedOption) => onChange(selectedOption?.value)}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
