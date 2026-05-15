// components/InputField.jsx
const InputField = ({ label, type = "text", placeholder, value, onChange, options = null }) => {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      {options ? (
        <select className="p-3 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          className="p-3 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default InputField;