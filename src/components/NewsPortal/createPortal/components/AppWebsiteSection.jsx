export default function AppWebsiteSection({
  formData,
  hasError,
  getInputBorder,
  handleChange,
  handleBlur,
  validation,
}) {
  return (
    <>
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-medium text-gray-900">
          App & Website Information
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Provide details about your digital platform
        </p>
      </div>

      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="app_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            App Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="app_name"
            name="app_name"
            value={formData.app_name}
            onChange={handleChange}
            onBlur={() => handleBlur("app_name")}
            maxLength={30}
            placeholder="Your app display name"
            className={`block w-full px-3 py-3 border ${getInputBorder(
              "app_name"
            )} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm`}
          />
          <div className="flex justify-between mt-1">
            <p
              className={`text-xs ${
                hasError("app_name") ? "text-red-600" : "text-gray-500"
              }`}
            >
              {validation.errors.app_name || "Min. 3 characters"}
            </p>
            <p className="text-xs text-gray-500">
              {formData.app_name.length}/30
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="app_package_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            App Package Name
          </label>
          <input
            type="text"
            id="app_package_name"
            name="app_package_name"
            value={formData.app_package_name}
            readOnly
            placeholder="Auto-filled from package"
            className="block w-full px-3 py-3 border border-gray-300 bg-gray-50 rounded-md shadow-sm sm:text-sm cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-gray-500">
            This will be auto-generated
          </p>
        </div>
      </section>
    </>
  );
}