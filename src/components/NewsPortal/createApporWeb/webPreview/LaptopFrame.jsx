// const LaptopFrame = ({ PreviewComponent }) => {
//   return (
//     <div className="relative mx-auto w-full max-w-3xl">
//       {/* Laptop Frame Structure */}
//       <div className="relative bg-gray-200 rounded-t-3xl rounded-b-2xl shadow-2xl">
//         {/* Laptop Top Bar with Camera */}
//         <div className="absolute -top-3 md:-top-5 left-1/2 transform -translate-x-1/2 w-16 md:w-32 h-2 md:h-6 bg-gray-300 rounded-t-lg flex justify-center items-start">
//           <div className="w-8 md:w-16 h-0.5 md:h-2 bg-gray-400 rounded-b-lg"></div>
//         </div>

//         {/* Laptop Screen Area */}
//         <div className="relative px-[8px] py-[8px] bg-black h-full">
//           {/* Screen Bezel */} 
//           <div className="bg-black rounded-t-xl rounded-b-md overflow-hidden aspect-video border-2 md:border-4 border-gray-800 h-full">
//             {/* Your Website Preview Component Goes Here */}
//             <div className="w-full h-full bg-white overflow-auto hide-scrollbar">
//               {PreviewComponent}
//             </div>
//           </div>
//         </div>
        
//         <div className="bg-gray-500 h-[10px] md:h-[20px]" />
//         {/* Laptop Keyboard Area - Hidden on small screens */}
//         {/* <div className="hidden sm:block bg-gray-300 mx-1 rounded-t-md rounded-xl py-1 rounded-b-lg border-2 border-gray-800"> */}
//           {/* Keyboard Top Row (Function Keys) */}
//           {/* <div className="flex justify-center mb-0.5 md:mb-1">
//             <div className="flex space-x-1 md:space-x-3">
//               {Array.from({ length: 12 }).map((_, i) => (
//                 <div key={`f${i}`} className="w-3 h-1 md:w-7 md:h-2 bg-gray-700 rounded-sm cursor-pointer"></div>
//               ))}
//             </div>
//           </div> */}
          
//           {/* Main Keyboard */}
//           <div className="flex flex-col items-center space-y-[1px] ">
//             {/* {renderKeyboardRow(['Esc', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace'], {
//               'Backspace': 'w-10 md:w-16'
//             })}
            
//             {renderKeyboardRow(['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'], {
//               'Tab': 'w-8 md:w-12'
//             })} */}
            
//             {/* {renderKeyboardRow(['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'], {
//               'Caps': 'w-6 md:w-10',
//               'Enter': 'w-8 md:w-12'
//             })} */}
            
//             {/* {renderKeyboardRow(['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'], {
//               'Shift': 'w-8 md:w-12'
//             })} */}
            
//             {/* Space Bar Row */}
//             {/* <div className="flex space-x-1 md:space-x-3 text-[4px] md:text-[5px]">
//               <Key width="w-6 md:w-12 ">Ctrl</Key>
//               <Key width="w-6 md:w-12 ">Win</Key>
//               <Key width="w-6 md:w-12 ">Alt</Key>
//               <Key width="w-24 md:w-40 "></Key>
//               <Key width="w-6 md:w-12 ">Alt</Key>
//               <Key width="w-6 md:w-12 ">Fn</Key>
//               <Key width="w-6 md:w-12 ">Ctrl</Key>
//             </div> */}
//           {/* </div> */}
          
//           {/* Touchpad Area */}
//           {/* <div className="flex justify-center mt-1 md:mt-2">
//             <div className="w-16 h-6 md:w-32 md:h-10 bg-gray-400 rounded-md"></div>
//           </div> */}
//         </div>
        
//         {/* Simplified Mobile Keyboard */}
//         {/* <div className="sm:hidden bg-gray-300 mx-1 rounded-t-md rounded-xl py-1 rounded-b-lg border border-gray-800"> */}
//           {/* <div className="flex justify-center mb-1">
//             <div className="flex space-x-1">
//               {Array.from({ length: 6 }).map((_, i) => (
//                 <div key={`mf${i}`} className="w-3 h-1 bg-gray-700 rounded-sm"></div>
//               ))}
//             </div>
//           </div> */}
//           {/* <div className="flex justify-center">
//             <div className="w-24 h-4 bg-gray-400 rounded-md"></div>
//           </div> */}
//         {/* </div> */}
        
//         {/* Laptop Stand */}
//         {/* <div className="absolute -bottom-2 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-16 md:w-24 h-2 md:h-4 bg-gray-300 rounded-b-lg"></div> */}
//       </div>
//     </div>
//   );
// };

// // Helper function to render keyboard rows
// // const renderKeyboardRow = (keys, specialKeys = {}) => (
// //   <div className="flex space-x-1 md:space-x-3">
// //     {keys.map(key => (
// //       <Key 
// //         key={key} 
// //         width={specialKeys[key] || 'w-4 md:w-7'}
// //         height="h-4 md:h-6"
      
// //       >
// //         {key}
// //       </Key>
// //     ))}
// //   </div>
// // );

// // Keyboard Key Component
// // const Key = ({ children, width = 'w-4 md:w-7', height = 'h-4 md:h-6' }) => {
// //   return (
// //     <div className={`${width} ${height} bg-gray-700 rounded-sm flex items-center justify-center text-white text-[6px] md:text-xs font-mono cursor-pointer`}>
// //       {children}
// //     </div>
// //   );
// // };

// export default LaptopFrame;



const LaptopFrame = ({ PreviewComponent }) => {
  return (
    <div className="relative mx-auto w-full max-w-5xl hide-scrollbar">
      {/* Laptop Frame Structure */}
      <div className="relative bg-gray-800 rounded-t-[2rem] rounded-b-lg shadow-2xl">
        {/* Laptop Top Bar with Camera */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-lg flex justify-center items-start">
          <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
        </div>

        {/* Laptop Screen Area */}
        <div className="relative px-2 py-2 md:px-4 md:py-4 bg-black">
          {/* Screen Bezel */}
          <div className="bg-black rounded-xl overflow-hidden aspect-video border-4 border-gray-800">
            {/* Website Preview Component */}
            <div className="w-full h-full bg-white overflow-auto hide-scrollbar">
              {PreviewComponent}
            </div>
          </div>
        </div>
        
        {/* Laptop Bottom Section */}
        <div className="bg-gray-800 h-8 md:h-12 rounded-b-lg relative">
          {/* Keyboard Area */}
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="w-4/5 h-1 bg-gray-700 rounded"></div>
          </div>
          
          {/* Touchpad */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gray-600 rounded-full"></div>
        </div>
      </div>
      
      {/* Laptop Stand */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gray-700 rounded-b-lg"></div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-gray-800 rounded-b-lg"></div>
    </div>
  );
};

export default LaptopFrame;