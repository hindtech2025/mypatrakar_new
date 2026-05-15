import React,  { useState } from 'react';

function Buttons() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedTiming, setSelectedTiming] = useState(null);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    setSelectedTiming(null); // Reset timing when region changes
  };

  const handlePurchaseOptionClick = (timing) => {
    setSelectedTiming(timing);
  };

  return (
    <div className="flex flex-col items-center">
      {selectedRegion === "india" && (
        <div className="flex border-2 rounded-full items-center justify-center my-5">
          <button
            className={`py-3 px-10 border rounded-l-full font-semibold shadow-md box-border 
              hover:bg-red-100 focus:bg-red-500 focus:text-white active:bg-red-500 active:text-white
              ${selectedTiming === "quarterly" ? 'bg-red-500 text-white' : 'bg-white'}`}
            onClick={() => handlePurchaseOptionClick("quarterly")}
          >
            Quarterly
          </button>
          <button
            className={`py-3 px-10 border font-semibold shadow-md box-border 
              hover:bg-red-100 focus:bg-red-500 focus:text-white active:bg-red-500 active:text-white
              ${selectedTiming === "yearly" ? 'bg-red-500 text-white' : 'bg-white'}`}
            onClick={() => handlePurchaseOptionClick("yearly")}
          >
            Yearly
          </button>
          {/* <button
            className={`py-3 px-10 border rounded-r-full font-semibold shadow-md box-border 
              hover:bg-red-100 focus:bg-red-500 focus:text-white active:bg-red-500 active:text-white
              ${selectedTiming === "one-time" ? 'bg-red-500 text-white' : 'bg-white'}`}
            onClick={() => handlePurchaseOptionClick("one-time")}
          >
            One-Time Purchase
          </button> */}
        </div>
      )}
      {selectedRegion === "outside" && (
        <div className="flex border-2 rounded-full justify-center my-5">
          <button
            className={`py-3 px-10 border rounded-l-full font-semibold shadow-md box-border 
              hover:bg-red-100 focus:bg-red-500 focus:text-white active:bg-red-500 active:text-white
              ${selectedTiming === "yearly" ? 'bg-red-500 text-white' : 'bg-white'}`}
            onClick={() => handlePurchaseOptionClick("yearly")}
          >
            Yearly
          </button>
          {/* <button
            className={`py-3 px-10 border rounded-r-full font-semibold shadow-md box-border 
              hover:bg-red-100 focus:bg-red-500 focus:text-white active:bg-red-500 active:text-white
              ${selectedTiming === "one-time" ? 'bg-red-500 text-white' : 'bg-white'}`}
            onClick={() => handlePurchaseOptionClick("one-time")}
          >
            One-Time Purchase
          </button> */}
        </div>
      )}
      {/* Region buttons for selection */}
      <div className="flex space-x-4 mt-5">
        <button
          className={`py-2 px-4 font-semibold border rounded shadow 
            ${selectedRegion === "india" ? 'bg-red-500 text-white' : 'bg-white'}`}
          onClick={() => handleRegionClick("india")}
        >
          India
        </button>
        <button
          className={`py-2 px-4 font-semibold border rounded shadow 
            ${selectedRegion === "outside" ? 'bg-red-500 text-white' : 'bg-white'}`}
          onClick={() => handleRegionClick("outside")}
        >
          Outside
        </button>
      </div>
    </div>
  );
}

export default Buttons;
