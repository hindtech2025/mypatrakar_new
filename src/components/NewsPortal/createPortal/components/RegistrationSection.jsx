// export default function RegistrationSection({
//   formData,
//   hasError,
//   getInputBorder,
//   handleChange,
//   handleBlur,
//   validation,
// }) {
//   return (
//     <section className="grid  gap-6">
//       <div>
//         <label
//           htmlFor="registration_type"
//           className="block text-sm font-medium text-gray-700 mb-1"
//         >
//           Registration Type <span className="text-red-500">*</span>
//         </label>

//         <div
//           className={`
//             flex flex-col gap-3 px-3 py-3 border
//             ${getInputBorder("registration_type")}
//             rounded-md shadow-sm bg-white
//           `}
//         >
//           <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//             {/* MIB */}
//             <label className="flex items-start gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="registration_type"
//                 value="0"
//                 checked={formData.registration_type === "0"}
//                 onChange={handleChange}
//                 onBlur={() => handleBlur("registration_type")}
//                 className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 mt-0.5"
//               />
//               <span className="text-xs text-gray-700 font-medium leading-tight">
//                 MIB (Ministry of Information and Broadcasting)
//               </span>
//             </label>
//             {/* RNI */}
//             <label className="flex items-start gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="registration_type"
//                 value="1"
//                 checked={formData.registration_type === "1"}
//                 onChange={handleChange}
//                 onBlur={() => handleBlur("registration_type")}
//                 className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 mt-0.5"
//               />
//               <span className="text-xs text-gray-700 font-medium leading-tight">
//                 RNI (Registrar of Newspapers for India)
//               </span>
//             </label>

//             {/* PIB */}
//             <label className="flex items-start gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="registration_type"
//                 value="2"
//                 checked={formData.registration_type === "2"}
//                 onChange={handleChange}
//                 onBlur={() => handleBlur("registration_type")}
//                 className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 mt-0.5"
//               />
//               <span className="text-xs text-gray-700 font-medium leading-tight">
//                 PIB (Press Information Bureau)
//               </span>
//             </label>
//           </div>
//         </div>

//         <div className="flex justify-between mt-1">
//           <p
//             className={`text-xs ${
//               hasError("registration_type") ? "text-red-600" : "text-gray-500"
//             }`}
//           >
//             {validation.errors.registration_type || "Select MIB,RNI or PIB"}
//           </p>
//         </div>
//       </div>

//       <div>
//         <label
//           htmlFor="registration_no"
//           className="block text-sm font-medium text-gray-700 mb-1 "
//         >
//           Registration Number
//         </label>
//         <input
//           type="text"
//           id="registration_no"
//           name="registration_no"
//           value={formData.registration_no}
//           placeholder="Registration Number"
//           onChange={handleChange}
//           className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm sm:text-sm"
//         />
//         <p className="mt-1 text-xs text-gray-500">
//           This will be Registration Number
//         </p>
//       </div>
//     </section>
//   );
// }



export default function RegistrationSection({
  formData,
  hasError,
  getInputBorder,
  handleChange,
  handleBlur,
  validation,
}) {
  return (
    <section className="grid gap-6">
      <div>
        <label
          htmlFor="registration_type"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Registration Type <span className="text-red-500">*</span>
        </label>

        <div
          className={`
            flex flex-col gap-3 px-3 py-3 border
            ${getInputBorder("registration_type")}
            rounded-md shadow-sm bg-white
          `}
        >
          {/* First Row - 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* MIB */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="registration_type"
                value="0"
                checked={formData.registration_type === "0"}
                onChange={handleChange}
                onBlur={() => handleBlur("registration_type")}
                className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 mt-0.5"
              />
              <span className="text-xs text-gray-700 font-medium leading-tight">
                MIB (Ministry of Information and Broadcasting)
              </span>
            </label>
            
            {/* RNI */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="registration_type"
                value="1"
                checked={formData.registration_type === "1"}
                onChange={handleChange}
                onBlur={() => handleBlur("registration_type")}
                className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 mt-0.5"
              />
              <span className="text-xs text-gray-700 font-medium leading-tight">
                RNI (Registrar of Newspapers for India)
              </span>
            </label>
          </div>

          {/* Second Row - 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* PIB */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="registration_type"
                value="2"
                checked={formData.registration_type === "2"}
                onChange={handleChange}
                onBlur={() => handleBlur("registration_type")}
                className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 mt-0.5"
              />
              <span className="text-xs text-gray-700 font-medium leading-tight">
                PIB (Press Information Bureau)
              </span>
            </label>

            {/* MSME */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="registration_type"
                value="3"
                checked={formData.registration_type === "3"}
                onChange={handleChange}
                onBlur={() => handleBlur("registration_type")}
                className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 mt-0.5"
              />
              <span className="text-xs text-gray-700 font-medium leading-tight">
                MSME (Micro, Small & Medium Enterprises)
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-1">
          <p
            className={`text-xs ${
              hasError("registration_type") ? "text-red-600" : "text-gray-500"
            }`}
          >
            {validation.errors.registration_type || "Select MIB, RNI, PIB or MSME"}
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="registration_no"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Registration Number
        </label>
        <input
          type="text"
          id="registration_no"
          name="registration_no"
          value={formData.registration_no}
          placeholder="Enter Registration Number"
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm sm:text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">
          {formData.registration_type === "0" && "Enter MIB Registration Number"}
          {formData.registration_type === "1" && "Enter RNI Registration Number"}
          {formData.registration_type === "2" && "Enter PIB Registration Number"}
          {formData.registration_type === "3" && "Enter MSME Registration Number"}
          {!formData.registration_type && "This will be Registration Number"}
        </p>
      </div>
    </section>
  );
}