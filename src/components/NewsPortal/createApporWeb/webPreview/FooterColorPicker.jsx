// FooterColorPicker.js
import { useState, useCallback } from "react";
import { SketchPicker } from "react-color";
import WebPreview from "./WebPreview";

const FooterColorPicker = ({
  setFooterColor,
  initialColor = "#3b82f6",
  calculateTextColor,
  footerText,
  setFooterText,
  setFontBottom,
  fontBottom,
}) => {
  const [currentColor, setCurrentColor] = useState(initialColor);
  const handleColorChange = useCallback(
    (selectedColor) => {
      const newColor = selectedColor.hex;
      const optimalTextColor = calculateTextColor(selectedColor.rgb);
      setCurrentColor(newColor);
      setFooterText(optimalTextColor);
      setFooterColor(newColor);
    },
    [calculateTextColor, setFooterColor]
  );

  return (
    <div className="w-full my-3 border rounded-lg flex  items-center justify-center py-2 pl-2 pr-0">
      <div>
        <span className="text-blue-500 text-md">Footer color selector</span>
        <div className="animate-fadeIn p-2">
          <SketchPicker
            color={currentColor}
            onChangeComplete={handleColorChange}
            width="95%"
            presetColors={[
              "#3b82f6",
              "#ef4444",
              "#10b981",
              "#f59e0b",
              "#8b5cf6",
              "#ec4899",
              "#000000",
              "#ffffff",
              "#6366f1",
              "#f97316",
              "#06b6d4",
              "#d946ef",
            ]}
            styles={{
              default: {
                picker: {
                  boxShadow: "none",
                },
              },
            }}
          />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div
            className="w-6 h-6 rounded-full border border-gray-200"
            style={{ backgroundColor: currentColor }}
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700">
              Selected Color
            </div>
            <div className="text-xs text-gray-500">
              {currentColor.toUpperCase()}
            </div>
          </div>
          <div
            className="w-6 h-6 rounded-full border border-gray-200"
            style={{ backgroundColor: footerText }}
          />
          {/* <div className="flex-1">
          <div className="text-sm font-medium text-gray-700">Text Color</div>
          <div className="text-xs text-gray-500">
            {footerText.toUpperCase()}
          </div>
        </div> */}
          {/* Font Selector */}
          {/* <div>
            <label className="block text-xs text-gray-500 mb-1">Font</label>
            <div className="flex items-center gap-2">
              <select
                name={"fontFamily"}
                value={fontBottom}
                // onChange={(e) => setFontFamily(e.target.value)}
                onChange={(e) => setFontBottom(e.target.value)}
                className="text-sm border  border-gray-200 rounded px-2 py-1 w-full"
                style={{
                  fontFamily: fontBottom,
                }}
              >
                <option value="Poppins">Poppins</option>
                <option value="Roboto">Roboto</option>
                <option value="Inter">Inter</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Nunito">Nunito</option>
              </select>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FooterColorPicker;
