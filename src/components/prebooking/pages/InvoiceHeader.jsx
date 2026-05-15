import { AiOutlineInfoCircle } from "react-icons/ai";

export default function InvoiceHeader({ displayData }) {
  return (
    <div className="bg-white rounded-3xl px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8">
      
      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-10">
        
        {/* LEFT */}
        <div className="w-full">
          <p className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.18em]">
            Client / Media Entity:
          </p>

          <h3 className="text-2xl sm:text-[26px] lg:text-[32px] font-black text-[#1A2B4C] leading-tight mt-1 break-words">
            {displayData.mediaHouse}
          </h3>

          <p className="text-xs sm:text-sm font-bold text-slate-500 italic mt-1">
            Attn: {displayData.fullName}
          </p>

          <p className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">
            {displayData.city}, {displayData.state}
          </p>

          <div className=" pdf-btn mt-4 sm:mt-6 inline-block bg-[#1A2B4C] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-mono text-xs sm:text-sm font-black tracking-[0.2em] uppercase break-all">
            {displayData.regId}
          </div>

          <p className="text-[9px] sm:text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">
            REG TYPE: {displayData.regType}
          </p>
        </div>

        {/* RIGHT – PRE BILLING NOTICE */}
        <div className="bg-[#FFF1F2] px-4 sm:px-6 py-4 rounded-2xl w-full md:max-w-[320px] border border-[#FFE4E6] flex gap-3 sm:gap-4">
          <AiOutlineInfoCircle className="text-[#E11D48] text-xl sm:text-2xl mt-0.5 shrink-0" />

          <div>
            <h5 className="text-[11px] sm:text-xs font-black text-[#E11D48] uppercase tracking-tight">
              Pre-billing Notice
            </h5>
            <p className="text-[10px] sm:text-[11px] text-[#991B1B] font-bold leading-relaxed mt-1">
              This is a booking confirmation. The final GST Tax Invoice will be
              issued during full project settlement.
            </p>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200 mt-8 sm:mt-10 pt-5 sm:pt-6">
        <div className="flex justify-between border-b border-gray-200 pb-2">
          <span className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.22em]">
            Infrastructure Item
          </span>
          <span className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.22em]">
            Amount
          </span>
        </div>

        {/* ITEM ROW */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 sm:mt-5 gap-3">
          <div className="max-w-full sm:max-w-[70%]">
            <h4 className="text-base sm:text-lg font-black text-[#1A2B4C] uppercase leading-tight">
              App & Website Development Advance
            </h4>
            <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase mt-1 tracking-wider">
              Portal reservation and digital setup initiation fee.
            </p>
          </div>

          <p className="text-2xl sm:text-4xl font-black text-[#1A2B4C] whitespace-nowrap">
            ₹999.00
          </p>
        </div>
      </div>

      {/* TOTAL */}
      <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center gap-2 sm:gap-4 pt-6 sm:pt-8 mt-6 sm:mt-8">
        <span className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
          Total Received
        </span>
        <span className="text-3xl sm:text-[52px] font-black text-[#FF1E1E] leading-none whitespace-nowrap">
          ₹999.00
        </span>
      </div>
    </div>
  );
}
