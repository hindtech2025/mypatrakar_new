import React, { useEffect, useState } from "react";
import { getSates, getCitiesBySates } from "../../../api"; // API functions

const SelectField = ({ label, name, value, onChange, options = [] }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded p-2"
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((opt) =>
          typeof opt === "string" ? (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ) : (
            <option key={opt.id} value={opt.name}>
              {opt.name}
            </option>
          )
        )}
      </select>
    </div>
  );
};

const StateCitySelector = () => {
  const [basicDetails, setBasicDetails] = useState({
    owner_state: "",
    owner_city: "",
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBasicDetails((prev) => ({
      ...prev,
      [name]: value,
      // Reset city when state changes
      ...(name === "owner_state" && { owner_city: "" })
    }));
  };

  const loadStates = async () => {
    try {
      const res = await getSates(); // API call
      const statesArray = res?.data?.data || [];

      // Format response to { id, name } format
      const formattedStates = statesArray.map((state) =>
        typeof state === "string"
          ? { id: state, name: state }
          : { id: state.id, name: state.name }
      );

      setStates(formattedStates);
    } catch (err) {
      // console.error("Failed to load states", err);
    }
  };

  const loadCities = async () => {
    if (!basicDetails.owner_state) {
      setCities([]);
      return;
    }

    try {
      setLoadingCities(true);
      // console.log(basicDetails)
      const res = await getCitiesBySates(basicDetails.owner_state);
      const citiesArray = res?.data?.data || [];

      const formattedCities = citiesArray.map((city) =>
        typeof city === "string"
          ? { id: city, name: city }
          : { id: city.id, name: city.name }
      );

      setCities(formattedCities);
    } catch (err) {
      // console.error("Failed to load cities", err);
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

  useEffect(() => {
    loadStates();
  }, []);

  useEffect(() => {
    loadCities();
  }, [basicDetails.owner_state]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <SelectField
        label="State"
        name="owner_state"
        value={basicDetails.owner_state}
        onChange={handleChange}
        options={states}
      />
      <SelectField
        label="City"
        name="owner_city"
        value={basicDetails.owner_city}
        onChange={handleChange}
        options={loadingCities ? [] : cities}
        disabled={!basicDetails.owner_state || loadingCities}
      />
      {loadingCities && (
        <p className="text-sm text-gray-500">Loading cities...</p>
      )}
    </div>
  );
};

export default StateCitySelector;