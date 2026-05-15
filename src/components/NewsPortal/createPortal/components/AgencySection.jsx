export default function AgencySection({
  formData,
  hasError,
  getInputBorder,
  handleChange,
  handleBlur,
  validation,
}) {
  return (
    <>
      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="agency_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            News Agency Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="agency_name"
            name="agency_name"
            value={formData.agency_name}
            onChange={handleChange}
            onBlur={() => handleBlur("agency_name")}
            placeholder="e.g. NDTV, Republic TV"
            className={`block w-full px-3 py-3 border ${getInputBorder(
              "agency_name"
            )} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm`}
          />
          {hasError("agency_name") && (
            <p className="mt-1 text-sm text-red-600">
              {validation.errors.agency_name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="agency_add"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Agency Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="agency_add"
            name="agency_add"
            value={formData.agency_add}
            onChange={handleChange}
            onBlur={() => handleBlur("agency_add")}
            placeholder="Full agency address"
            className={`block w-full px-3 py-3 border ${getInputBorder(
              "agency_add"
            )} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm`}
          />
          {hasError("agency_add") && (
            <p className="mt-1 text-sm text-red-600">
              {validation.errors.agency_add}
            </p>
          )}
        </div>
      </section>
    </>
  );
}