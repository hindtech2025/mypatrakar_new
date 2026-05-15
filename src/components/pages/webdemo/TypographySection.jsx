import { Type } from "lucide-react";
import { typographyPersonalities } from "./utils/webDemoHelpers";


const TypographySection = ({ fontFamily, setFontFamily }) => {
  return (
    <div className="space-y-6">
      <h3 className="px-2 text-xs font-black uppercase tracking-[0.2em] text-slate-800 flex items-center gap-2">
        <Type size={14} className="text-red-600" /> Typography Style
      </h3>
      <div className="bg-white p-4 rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 grid grid-cols-1 gap-2 max-h-[417px] overflow-y-auto custom-scrollbar">
        {typographyPersonalities.map((font) => (
          <button
            key={font.name}
            onClick={() => setFontFamily(font.name)}
            className={`flex items-center justify-between p-5 rounded-2xl text-left transition-all ${
              fontFamily === font.name
                ? "bg-red-50 text-red-600 ring-1 ring-red-100 shadow-sm shadow-red-100"
                : "hover:bg-slate-50 text-slate-500 hover:text-slate-700"
            }`}
            aria-label={`Select ${font.name} font`}
            aria-pressed={fontFamily === font.name}
          >
            <span
              className="text-base font-bold"
              style={{ fontFamily: font.family }}
            >
              {font.name}
            </span>
            {fontFamily === font.name && (
              <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypographySection;