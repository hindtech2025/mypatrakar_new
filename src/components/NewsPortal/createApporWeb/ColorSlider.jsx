import { Slider } from "@material-tailwind/react";
import React from "react";

const ColorSlider = ({ color, setColor }) => {
  return (
    <div>
      <div className="flex gap-5 items-center">
        {/* Color preview circle */}
        <div
          className="mt-4 h-16 w-16 rounded-full"
          style={{ backgroundColor: `hsl(${color}, 80%, 50%)` }}
        />

        {/* Slider with dynamic background and thumb color */}
        <div className="w-64">
          <Slider
            value={color}
            min={0}
            max={360}
            onChange={(e) => setColor(e.target.value)}
            style={{
              // Dynamic slider background changing based on the color value
              background: `linear-gradient(to right, hsl(${color}, 100%, 50%), hsl(${color}, 20%, 80%))`,
              height: "20px",
            }}
          />
          <style jsx>{`
            .mtw-slider::-webkit-slider-thumb {
              background-color: hsl(
                ${color},
                100%,
                50%
              ); /* Change thumb color dynamically */
              border: 2px solid white; /* White border around the thumb */
              height: 16px;
              width: 16px;
              border-radius: 50%;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default ColorSlider;
