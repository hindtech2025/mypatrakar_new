
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import WebPreview from "./webPreview/WebPreview";
import { PreViewContext } from "../../../context/PreViewContext";
import FooterColorPicker from "./webPreview/FooterColorPicker";
import { Palette } from "lucide-react";

const WebColor = ({ setUserRequest }) => {
  const [color, setColor] = useState("#3b82f6");
  const [footerColor, setFooteColor] = useState("#3b82f6");
  const [footerText, setFooterText] = useState("#fff");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontBottom, setFontBottom] = useState("Roboto");
  const [fontTop, setFontTop] = useState("Roboto");

  const { updateWebPreview } = useContext(PreViewContext);

  // Add a ref to block re-render loops (very important)
  const previewUpdateRef = useRef({
    color: "",
    footerColor: "",
    textColor: "",
    fontTop: "",
    fontBottom: "",
  });

  // Brightness-based text color
  const calculateTextColor = useCallback((rgb) => {
    const brightness = Math.round(
      (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000,
    );
    return brightness > 125 ? "#000000" : "#ffffff";
  }, []);

  const handleColorChange = useCallback(
    (selectedColor) => {
      const newColor = selectedColor.hex;
      const optimalTextColor = calculateTextColor(selectedColor.rgb);
      setColor(newColor);
      setTextColor(optimalTextColor);
    },
    [calculateTextColor],
  );

  // -----------------------------------------
  // FIXED USE EFFECT (No infinite loop)
  // -----------------------------------------
  useEffect(() => {
    // UPDATE USER REQUEST — SAFE
    setUserRequest((prev) => ({
      ...prev,
      web_color: {
        primary: color,
        text: textColor,
        font_top: fontTop,
        font_bottom: fontBottom,
      },
      web_footer_color: {
        primary: footerColor,
        text: footerText,
        font_bottom: fontBottom,
      },
    }));

    // AVOID LOOP: update preview only when values actually change
    const last = previewUpdateRef.current;
    if (
      last.color !== color ||
      last.footerColor !== footerColor ||
      last.textColor !== textColor ||
      last.fontTop !== fontTop ||
      last.fontBottom !== fontBottom
    ) {
      previewUpdateRef.current = {
        color,
        footerColor,
        textColor,
        fontTop,
        fontBottom,
      };

      updateWebPreview({
        backgroundColor: color,
        color: textColor,
        web_footer_color: footerColor,
        font_top: fontTop,
        font_bottom: fontBottom,
      });
    }
  }, [
    color,
    footerColor,
    textColor,
    fontTop,
    fontBottom,
    footerText,
    setUserRequest,
    updateWebPreview,
  ]);

  // -----------------------------------------
  // JSX — SAME AS ORIGINAL (Not touched)
  // -----------------------------------------
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 my-6 md:my-12 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
        <div className="w-full md:w-1/2 mx-auto lg:w-1/3 space-y-6">
          <div className="flex items-start mb-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <Palette size={20} className="text-blue-500" />
                Web Color Customization
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Customize your website’s primary color and font
              </p>
            </div>
          </div>

          <div className="border rounded-md p-3 sm:p-4">
            <SketchPicker
              color={color}
              onChangeComplete={handleColorChange}
              width="100%"
              className="w-full"
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
                    width: "100%",
                    boxShadow: "none",
                    border: "none",
                  },
                },
              }}
            />

            <div className="mt-6 flex items-start gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    Primary
                  </div>
                  <div className="text-xs text-gray-500">
                    {color.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: textColor }}
                />
                <div>
                  <div className="text-sm font-medium text-gray-700">Text</div>
                  <div className="text-xs text-gray-500">
                    {textColor.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs text-gray-500 mb-1">Font</label>
                <select
                  value={fontTop}
                  name="fontFamily"
                  onChange={(e) => setFontTop(e.target.value)}
                  className="text-sm bg-white border border-gray-300 rounded px-2 py-1 w-full"
                >
                  <option value="Libre Baskerville">Libre Baskerville</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Noto Sans">Noto Sans</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Inter">Inter</option>

                  <option value="Hindi">Hindi</option>
                  <option value="Mukta">Mukta</option>
                  <option value="Lato">Lato</option>

                  <option value="Source Sans 3">Source Sans 3</option>
                </select>
              </div>
            </div>
          </div>

          <FooterColorPicker
            setFooterColor={setFooteColor}
            calculateTextColor={calculateTextColor}
            footerText={footerText}
            setFooterText={setFooterText}
            setFontBottom={setFontBottom}
            fontBottom={fontBottom}
          />
        </div>

        <div className="w-full lg:w-2/3">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-800">
              Live Preview
            </h2>
            <p className="text-sm text-gray-500">
              See how your color & font choices look in your website
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
            <WebPreview
              bgColor={color}
              color={textColor}
              footerColor={footerColor}
              footerText={footerText}
              fontTop={fontTop}
              fontBottom={fontBottom}
              navigationLinks={["Home", "About Us", "Terms And Condition"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

WebColor.propTypes = {
  setUserRequest: PropTypes.func.isRequired,
};

export default React.memo(WebColor);
