import React, { useEffect, useState } from "react";

export default function ShortCard({ generatedShort }) {
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const truncatedLength = 200;
  const { image, title, description } = generatedShort || {};

  const toggleRead = () => setExpanded((prev) => !prev);

  // 🔁 30 seconds progress logic
  useEffect(() => {
    if (isLoaded) return;

    const totalTime = 30000; // 30 sec
    const intervalTime = 100; // 100ms
    const increment = 100 / (totalTime / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          return 99;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isLoaded]);

  // 🧠 Status text
  const getStatus = () => {
    if (progress < 30) return "Analyzing news...";
    if (progress < 60) return "Generating image...";
    if (progress < 90) return "Optimizing quality...";
    return "Almost done...";
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 max-w-md min-w-[359px]">
      {/* Image Section */}
      <div className="h-[266px] w-full rounded-xl overflow-hidden mb-4 bg-gray-100 relative">
        {image?.image ? (
          <img
            src={image.image}
            alt={title}
            onLoad={() => {
              setIsLoaded(true);
              setProgress(100);
            }}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
            {/* Progress Line */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status */}
            <p className="text-sm font-medium text-gray-600">
              {getStatus()} {Math.round(progress)}%
            </p>
          </div>
        )}
      </div>

      {/* Title */}
      <h2 className="text-[#334155] text-[18px] font-bold mb-2">{title}</h2>

      {/* Description */}
      <p className="text-[#64748B] text-[16px]">
        {expanded
          ? description
          : description?.length > truncatedLength
            ? description.slice(0, truncatedLength) + "..."
            : description}
      </p>

      {/* Read More */}
      {description?.length > truncatedLength && (
        <button
          onClick={toggleRead}
          className="mt-2 text-[#1354eb] font-semibold text-sm hover:underline"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
