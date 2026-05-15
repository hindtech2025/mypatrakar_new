import { Palette, Phone, MessageCircle } from "lucide-react";

const ColorsCommunication = ({
  headerColor,
  setHeaderColor,
  footerColor,
  setFooterColor,
  supportPhone,
  setSupportPhone,
  whatsapp,
  setWhatsapp
}) => {
  return (
    <div className="space-y-6">
      <h3 className="px-2 text-xs font-black uppercase tracking-[0.2em] text-slate-800 flex items-center gap-2">
        <Palette size={14} className="text-red-600" /> Colors & Communication
      </h3>
      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ColorPicker
            label="Header Color"
            value={headerColor}
            onChange={setHeaderColor}
          />
          <ColorPicker
            label="Footer Color"
            value={footerColor}
            onChange={setFooterColor}
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-10">
            <CommunicationInput
              icon={Phone}
              label="Support Helpline"
              value={supportPhone}
              onChange={setSupportPhone}
              placeholder=" ..."
            />
            <CommunicationInput
              icon={MessageCircle}
              label="WhatsApp Business"
              value={whatsapp}
              onChange={setWhatsapp}
              placeholder=" ..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ColorPicker = ({ label, value, onChange }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
      {label}
    </label>
    <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl hover:bg-white transition-colors shadow-sm">
      <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-inner ring-1 ring-black/5">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute -inset-2 w-16 h-16 cursor-pointer border-none bg-transparent"
          aria-label={`Pick ${label}`}
        />
      </div>
      <span className="text-xs font-mono font-bold text-slate-500">
        {value.toUpperCase()}
      </span>
    </div>
  </div>
);

// const CommunicationInput = ({ icon: Icon, label, value, onChange, placeholder }) => (
//   <div className="space-y-2">
//     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
//       {label}
//     </label>
//     <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-5 rounded-2xl focus-within:ring-4 focus-within:ring-red-500/10 focus-within:border-red-500 transition-all shadow-sm">
//       <Icon size={20} className="text-slate-400" />
//       <input
//         type="tel"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="bg-transparent text-base font-bold outline-none w-full"
//         placeholder={placeholder}
//       />
//     </div>
//   </div>
// );

const CommunicationInput = ({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder
}) => {
  const handleChange = (e) => {
    // sirf digits allow
    let digits = e.target.value.replace(/\D/g, "");

    // max 10 digits
    if (digits.length > 10) return;

    onChange(digits);
  };

  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">
        {label}
      </label>

      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-5 rounded-2xl
        focus-within:ring-4 focus-within:ring-red-500/10 focus-within:border-red-500 transition-all shadow-sm">

        <Icon size={20} className="text-slate-400" />

        {/* +91 fixed prefix */}
        <span className="text-base font-bold text-slate-500 select-none">
          +91
        </span>

        <input
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          className="bg-transparent text-base font-bold outline-none w-full tracking-widest"
          placeholder={placeholder}
          maxLength={10}
        />
      </div>

      <p className="text-[10px] text-slate-400 px-1">
        Enter 10 digit mobile number
      </p>
    </div>
  );
};


export default ColorsCommunication;