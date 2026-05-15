import { useContext, useState } from "react";
import { Settings, Upload } from "lucide-react";
import { LanguageContext } from "../../../context/LanguageContext";
import LanguageSelector from "../../NavigationBar/LanguageSelector";
// import LanguageSelector from "../NavigationBar/LanguageSelector";
// import { LanguageContext } from "../../context/LanguageContext";

const BrandingEssentials = ({ 
  brandName, 
  setBrandName, 
  handleLogoUpload, 
  logo,
  file 
}) => {
  const { language } = useContext(LanguageContext);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleLogoUpload({ target: { files: [file] } });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="px-2 text-xs font-black uppercase tracking-[0.2em] text-slate-800 flex items-center gap-2">
        <Settings size={14} className="text-red-600" /> Branding Essentials
      </h3>
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 space-y-8">
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
            Website Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all placeholder:text-slate-300 shadow-sm"
            placeholder="e.g. Dainik News"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
            Primary Language
          </label>
          <LanguageSelector
            className="flex items-center w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-base font-bold outline-none appearance-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all shadow-sm" 
            value={language}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
            Website Logo
          </label>
          <div 
            className={`relative h-28 w-full border-2 border-dashed rounded-[1.5rem] flex flex-col items-center justify-center transition-all cursor-pointer group overflow-hidden
              ${isDragging 
                ? 'border-red-500 bg-red-50 border-2' 
                : logo 
                ? 'border-green-200 bg-green-50/50' 
                : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-red-300'
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              onChange={handleLogoUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              accept=".png,.jpg,.jpeg,.svg,.webp"
            />
            {logo ? (
              <div className="relative group">
                <img
                  src={logo}
                  alt="Website logo"
                  className="h-14 object-contain transition-transform group-hover:scale-105"
                />
                <div className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-lg">
                  <Settings size={10} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:bg-red-50 transition-colors">
                  <Upload
                    size={20}
                    className="text-slate-400 group-hover:text-red-500"
                  />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {isDragging ? "Drop logo here" : "Drag & drop or click to upload"}
                </span>
                <span className="text-[9px] text-slate-300">
                  SVG, PNG, JPG (Max 5MB)
                </span>
              </div>
            )}
          </div>
          {file && (
            <p className="text-xs text-slate-400 mt-2 px-1">
              Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandingEssentials;