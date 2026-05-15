import React from "react";

const countries = [
  { name: "India", code: "+91" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Australia", code: "+61" },
  { name: "Japan", code: "+81" },
  { name: "Germany", code: "+49" },
  { name: "Brazil", code: "+55" },
  { name: "France", code: "+33" },
  { name: "China", code: "+86" },
  { name: "Russia", code: "+7" },
  { name: "South Korea", code: "+82" },
  { name: "South Africa", code: "+27" },
  { name: "Italy", code: "+39" },
  { name: "Mexico", code: "+52" },
  { name: "Spain", code: "+34" },
  { name: "Netherlands", code: "+31" },
  { name: "Argentina", code: "+54" },
  { name: "Turkey", code: "+90" },
  { name: "Saudi Arabia", code: "+966" },
];

const SelectCountry = ({ setCountryCode }) => {
  const handleChange = (e) => {
    setCountryCode(e.target.value);
  };

  return (
    <div className="mb-4 select-none">
      
      <select
        id="countryCode"
        name="countryCode"
        aria-label="Select country code"
        onChange={handleChange}
        defaultValue="+91"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      >
        {countries.map((cnt) => (
          <option key={cnt.code} value={cnt.code}>
            {cnt.name} ({cnt.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCountry;
