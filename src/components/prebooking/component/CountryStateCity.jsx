import Select from "react-select";
import { Country, State, City } from "country-state-city";

const dropdownStyle = {
  control: (base) => ({
    ...base,
    minHeight: "44px",
    borderRadius: "8px",
  }),
};

const CountryStateCity = ({ formData, onChange, errors }) => {
  const countries = Country.getAllCountries().map((c) => ({
    label: c.name,
    value: c.isoCode,
  }));

  const states = formData?.country
    ? State.getStatesOfCountry(formData.country).map((s) => ({
        label: s.name,
        value: s.isoCode,
      }))
    : [];

  const cities = formData?.state
    ? City.getCitiesOfState(formData.country, formData.state).map((c) => ({
        label: c.name,
        value: c.name,
      }))
    : [];

  // 🔥 fake event creator
  const triggerChange = (name, value) => {
    onChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* COUNTRY */}
      <div>
        <label className="block mb-1 font-medium">Country</label>
        <Select
          styles={dropdownStyle}
          options={countries}
          isSearchable
          placeholder="Select Country"
          value={countries.find(c => c.value === formData.country)}
          onChange={(selected) => {
            triggerChange("country", selected?.value);
            triggerChange("state", "");
            triggerChange("city", "");
          }}
        />
        {errors?.country && (
          <p className="text-red-500 text-sm">{errors.country}</p>
        )}
      </div>

      {/* STATE */}
      <div>
        <label className="block mb-1 font-medium">State</label>
        <Select
          styles={dropdownStyle}
          options={states}
          isSearchable
          isDisabled={!formData.country}
          placeholder="Select State"
          value={states.find(s => s.value === formData.state)}
          onChange={(selected) => {
            triggerChange("state", selected?.value);
            triggerChange("city", "");
          }}
        />
        {errors?.state && (
          <p className="text-red-500 text-sm">{errors.state}</p>
        )}
      </div>

      {/* CITY */}
      <div>
        <label className="block mb-1 font-medium">City</label>
        <Select
          styles={dropdownStyle}
          options={cities}
          isSearchable
          isDisabled={!formData.state}
          placeholder="Select City"
          value={cities.find(c => c.value === formData.city)}
          onChange={(selected) =>
            triggerChange("city", selected?.value)
          }
        />
        {errors?.city && (
          <p className="text-red-500 text-sm">{errors.city}</p>
        )}
      </div>
    </div>
  );
};

export default CountryStateCity;
