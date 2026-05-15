
// export default function RegionPlanSection({
//   formData,
//   packages,
//   isLoadingPackages,
//   hasError,
//   getInputBorder,
//   handleChange,
//   handleBlur,
//   handlePackageSelect,
//   validation,
// }) {
//   // Find selected package
//   const selectedPackage = packages.find(
//     (pkg) => pkg.package_id === formData.package_id
//   );
//   // console.log(packages);

//   // Calculation (ERP)
//   const price = selectedPackage?.price || 0;
//   const validity = selectedPackage?.validity || 0;

//   // // Days → Months
//   // const months = Math.ceil(validity / 30);

//   // // Total
//   // const calculatedTotal = price * months;

//   return (
//     <section className="grid md:grid-cols-2 gap-6">
//       {/* Region dropdown */}
//       <div>
//         <label
//           htmlFor="region"
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           Select Region <span className="text-red-500">*</span>
//         </label>

//         <select
//           id="region"
//           name="region"
//           value={formData.region}
//           onChange={handleChange}
//           onBlur={() => handleBlur("region")}
//           className={`block w-full pl-3 pr-10 py-3 text-base border ${getInputBorder(
//             "region"
//           )} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md`}
//         >
//           <option value="">Select Region</option>
//           <option value="0">India</option>
//           <option value="1">Outside India</option>
//         </select>

//         {hasError("region") && (
//           <p className="mt-1 text-sm text-red-600">
//             {validation.errors.region}
//           </p>
//         )}
//       </div>

//       {/* Package dropdown */}
//       <div>
//         <label
//           htmlFor="package_id"
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           Select Plan <span className="text-red-500">*</span>
//         </label>

//         <select
//           id="package_id"
//           name="package_id"
//           value={formData.package_id}
//           onChange={handlePackageSelect}
//           onBlur={() => handleBlur("package_id")}
//           disabled={!formData.region || isLoadingPackages}
//           className={`block w-full pl-3 pr-10 py-3 text-base border ${getInputBorder(
//             "package_id"
//           )} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md ${
//             !formData.region ? "bg-gray-100" : ""
//           }`}
//         >
//           <option value="">
//             {formData.region ? "Select Plan" : "Select region first"}
//           </option>

//           {packages.map((pkg) => (
//             <option key={pkg.package_id} value={pkg.package_id}>
//               {pkg.package_name} ({pkg.region === "0" ? "₹" : "$"}
//               {pkg.price}/month
//               {/* {pkg.validity === 365
//                 ? "Yearly"
//                 : pkg.validity === 90
//                 ? "Quarterly"
//                 : pkg.validity === 30
//                 ? "Monthly"
//                 : `${pkg.validity} days`} */}
//               )
//             </option>
//           ))}
//         </select>

//         {/* Fixed price display */}
//         {selectedPackage && (
//           <div className="mt-2 text-xs text-gray-500">
//             {/* <p>
//               Base Price:{" "}
//               <span className="font-semibold">
//                 {formData.region === "0" ? "₹" : "$"}
//                 {price}
//               </span>
//             </p> */}

//             {/* <p>
//               Validity:{" "}
//               <span className="font-semibold">
//                 {validity} days ({months} months)
//               </span>
//             </p> */}

//             <p className="text-gray-500 font-sans font-semibold">
//               {selectedPackage.price} ×{" "}
//               {selectedPackage.validity === 365
//                 ? "12"
//                 : selectedPackage.validity === 90
//                 ? "3"
//                 : selectedPackage.validity === 30
//                 ? "1"
//                 : `${selectedPackage.validity} days`}{" "}
//               ={" "}
//               <span className="">
//                 <span className="text-gray-700 font-bold">
//                   {" "}
//                   {formData.region === "0" ? "₹" : "$"}
//                   {selectedPackage.payable}
//                 </span>
//                 {/* {calculatedTotal} */}
//                 {"/"}
//                 {selectedPackage.validity === 365
//                   ? "Yearly"
//                   : selectedPackage.validity === 90
//                   ? "Quarterly"
//                   : selectedPackage.validity === 30
//                   ? "Monthly"
//                   : `${selectedPackage.validity} days`}
//               </span>
//             </p>

//             {/* <p className="text-green-700 font-bold">
//               Payable Amount: {formData.region === "0" ? "₹" : "$"}
//               {selectedPackage.payable}
//               {"/"}
//               {selectedPackage.validity === 365
//                 ? "Yearly"
//                 : selectedPackage.validity === 90
//                 ? "Quarterly"
//                 : selectedPackage.validity === 30
//                 ? "Monthly"
//                 : `${selectedPackage.validity} days`}
//             </p> */}
//           </div>
//         )}

//         {hasError("package_id") && (
//           <p className="mt-1 text-sm text-red-600">
//             {validation.errors.package_id}
//           </p>
//         )}
//       </div>
//     </section>
//   );
// }


export default function RegionPlanSection({
  formData,
  packages,
  isLoadingPackages,
  hasError,
  getInputBorder,
  handleChange,
  handleBlur,
  handlePackageSelect,
  validation,
}) {
  // Find selected package
  const selectedPackage = packages.find(
    (pkg) => pkg.package_id === formData.package_id
  );

  const isDemoMode = formData.is_demo === 1;

  return (
    <section className="grid md:grid-cols-2 gap-6">
      {/* Region dropdown */}
      <div>
        <label
          htmlFor="region"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Region <span className="text-red-500">*</span>
        </label>

        <select
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          onBlur={() => handleBlur("region")}
          className={`block w-full pl-3 pr-10 py-3 text-base border ${getInputBorder(
            "region"
          )} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md`}
        >
          <option value="">Select Region</option>
          <option value="0">India</option>
          <option value="1">Outside India</option>
        </select>

        {hasError("region") && (
          <p className="mt-1 text-sm text-red-600">
            {validation.errors.region}
          </p>
        )}
      </div>

      {/* Package dropdown */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="package_id"
            className="block text-sm font-medium text-gray-700"
          >
            Select Plan <span className="text-red-500">*</span>
          </label>
          
          {/* Mode Badge - Small and inline */}
          {formData.region && !isLoadingPackages && packages.length > 0 && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              isDemoMode 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {isDemoMode ? 'Demo' : ' Live'}
            </span>
          )}
        </div>

        <select
          id="package_id"
          name="package_id"
          value={formData.package_id}
          onChange={handlePackageSelect}
          onBlur={() => handleBlur("package_id")}
          disabled={!formData.region || isLoadingPackages}
          className={`block w-full pl-3 pr-10 py-3 text-base border ${getInputBorder(
            "package_id"
          )} focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md ${
            !formData.region ? "bg-gray-100" : ""
          } ${isDemoMode && formData.region ? 'border-yellow-300' : ''}`}
        >
          <option value="">
            {!formData.region 
              ? "Select region first"
              : isLoadingPackages 
              ? `Loading ${isDemoMode ? 'demo' : 'live'} packages...`
              : packages.length === 0
              ? `No ${isDemoMode ? 'demo' : 'live'} packages available`
              : "Select Plan"
            }
          </option>

          {packages.map((pkg) => (
            <option key={pkg.package_id} value={pkg.package_id}>
              {pkg.package_name} 
              {isDemoMode 
                ? ` (${pkg.validity} Days Demo)` 
                : ` (${pkg.region === "0" ? "₹" : "$"}${pkg.price}/month)`
              }
            </option>
          ))}
        </select>

        {/* Package price display - Same style as original */}
        {selectedPackage && (
          <div className="mt-2 text-xs text-gray-500">
            {isDemoMode ? (
              // Demo package display
              <p className="text-gray-500 font-sans font-semibold">
                <span className="text-yellow-600">Demo Package</span> •{" "}
                {selectedPackage.validity} Days Validity •{" "}
                <span className="text-green-600 font-bold">{selectedPackage.price} {formData?.region === "0" ? "₹" : "$"}</span>
              </p>
            ) : (
              // Live package display - Original style maintained
              <p className="text-gray-500 font-sans font-semibold">
                {selectedPackage.price} ×{" "}
                {selectedPackage.validity === 365
                  ? "12"
                  : selectedPackage.validity === 90
                  ? "3"
                  : selectedPackage.validity === 30
                  ? "1"
                  : `${selectedPackage.validity} days`}{" "}
                ={" "}
                <span className="">
                  <span className="text-gray-700 font-bold">
                    {" "}
                    {formData.region === "0" ? "₹" : "$"}
                    {selectedPackage.payable}
                  </span>
                  {"/"}
                  {selectedPackage.validity === 365
                    ? "Yearly"
                    : selectedPackage.validity === 90
                    ? "Quarterly"
                    : selectedPackage.validity === 30
                    ? "Monthly"
                    : `${selectedPackage.validity} days`}
                </span>
              </p>
            )}

            {/* Extra info for demo - subtle and inline */}
            {/* {isDemoMode && (
              <p className="text-xs text-yellow-600 mt-1">
                ⚡ No payment required - testing purpose only
              </p>
            )} */}
          </div>
        )}

        {/* Loading state */}
        {isLoadingPackages && formData.region && (
          <div className="mt-2 flex items-center text-xs text-gray-500">
            <svg className="animate-spin h-3 w-3 mr-1" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading {isDemoMode ? 'demo' : 'live'} packages...
          </div>
        )}

        {/* No packages message */}
        {!isLoadingPackages && formData.region && packages.length === 0 && (
          <p className="mt-2 text-xs text-red-500">
            No {isDemoMode ? 'demo' : 'live'} packages available for selected region
          </p>
        )}

        {hasError("package_id") && (
          <p className="mt-1 text-sm text-red-600">
            {validation.errors.package_id}
          </p>
        )}
      </div>
    </section>
  );
}