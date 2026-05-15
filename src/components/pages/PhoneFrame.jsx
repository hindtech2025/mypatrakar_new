
const PhoneFrame = ({ 
  children,
  frameColor = "#000000",
  screenColor = "#ffffff",
  model = "iphone-14",
  shadow = true,
  className = ""
}) => {
  const getModelStyles = () => {
    switch(model) {
      case "iphone-15":
        return {
          outerBorderRadius: "rounded-[3.5rem]",
          screenBorderRadius: "rounded-[2.7rem]",
          dimensions: "w-[360px] h-[720px]",
          borderWidth: "border-[14px]",
          notchWidth: "w-[110px]",
          screenPadding: "mx-3 my-9"
        };
      case "iphone-14":
        return {
          outerBorderRadius: "rounded-[3rem]",
          screenBorderRadius: "rounded-[2.3rem]",
          dimensions: "w-[340px] h-[680px]",
          borderWidth: "border-[12px]",
          notchWidth: "w-[100px]",
          screenPadding: "mx-2.5 my-7"
        };
      case "iphone-se":
        return {
          outerBorderRadius: "rounded-[2rem]",
          screenBorderRadius: "rounded-[1.5rem]",
          dimensions: "w-[300px] h-[600px]",
          borderWidth: "border-[10px]",
          notchWidth: "w-[0px]",
          screenPadding: "mx-2 my-5"
        };
      default:
        return {
          outerBorderRadius: "rounded-[3rem]",
          screenBorderRadius: "rounded-[2.3rem]",
          dimensions: "w-[340px] h-[680px]",
          borderWidth: "border-[12px]",
          notchWidth: "w-[90px]",
          screenPadding: "mx-2.5 my-7"
        };
    }
  };
  const styles = getModelStyles();
  const hasNotch = model !== "iphone-se";
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      {/* Main iPhone Frame */}
      <div 
        className={`relative ${styles.dimensions} ${styles.outerBorderRadius} ${shadow ? 'shadow-2xl' : ''} overflow-hidden`}
        style={{ backgroundColor: frameColor }}
      >
        {/* Top Notch - iPhone 15/14 ke liye */}
        {hasNotch && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
            <div className={`${styles.notchWidth} h-6 bg-black ${styles.outerBorderRadius} flex items-center justify-center`}>
              <div className="w-20 h-4 flex items-center justify-between px-2">
                <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                <div className="w-10 h-2 bg-black rounded-full"></div>
                <div className="w-3 h-3 border border-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
        {/* Screen Area */}
        <div 
          className={`${styles.screenPadding} ${styles.screenBorderRadius} overflow-hidden h-full`}
          style={{ backgroundColor: screenColor }}
        >
          {/* Children Content */}
          <div className="h-full w-full">
            {children}
          </div>
        </div>
        {/* Side Buttons */}
        <div className="absolute left-0 top-1/4 w-1 h-16 bg-gray-900 rounded-r-md"></div>
        <div className="absolute left-0 top-2/5 w-1 h-12 bg-gray-900 rounded-r-md"></div>
        <div className="absolute right-0 top-1/4 w-1 h-20 bg-gray-900 rounded-l-md"></div>
        {/* Silent Switch - iPhone 15/14 ke liye */}
        {hasNotch && (
          <div className="absolute left-0 top-1/5 w-1 h-8 bg-gray-900 rounded-r-md"></div>
        )}
        {/* Home Button - iPhone SE ke liye */}
        {model === "iphone-se" && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full border-4 border-gray-800"></div>
        )}
        {/* Home Indicator - Modern iPhones ke liye */}
        {model !== "iphone-se" && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full"></div>
        )}
      </div>
    </div>
  );
};
export default PhoneFrame;