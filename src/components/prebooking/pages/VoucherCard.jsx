
import { FaBolt, FaExclamationTriangle, FaRegFileAlt } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { TbCreditCardRefund } from "react-icons/tb";

export default function VoucherCard({ code }) {
  return (
    <div className="flex justify-center px-3 sm:px-4 py-6 sm:py-10">
      <div
        className="
          relative w-full
          rounded-3xl sm:rounded-[36px]
          bg-gradient-to-br from-[#0F1F3A] via-[#1A2B4C] to-[#223B6B]
          p-5 sm:p-6 md:p-8 lg:p-8 xl:p-12
          text-center space-y-6 sm:space-y-8
          overflow-hidden shadow-2xl
        "
      >
        {/* BACKGROUND WATERMARK */}
        <FaBolt className="absolute -top-16 -right-16 text-white opacity-[0.035] text-[220px] sm:text-[260px] rotate-12 pointer-events-none" />

        {/* CREDIT BADGE */}
        <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 sm:px-5 py-2 rounded-full border border-white/10">
          <FaBolt className="text-[#FF1E1E] text-[11px]" />
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em]">
            Credit Applied
          </span>
        </div>

        {/* VOUCHER CODE */}
        <div className="space-y-3 sm:space-y-4">
          <p className="text-[9px] sm:text-[10px] font-black text-white/50 uppercase tracking-[0.45em]">
            Development Voucher Code
          </p>

          <div className="border-2 pdf-btn border-dashed border-white/25 rounded-2xl sm:rounded-[28px] py-6 sm:py-8 md:py-10 px-3 sm:px-4 bg-white/[0.03]">
            <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-6xl font-black tracking-[0.15em] sm:tracking-[0.18em] break-all select-all">
             MYPTRP
            </h2>
          </div>
        </div>

        {/* DISCOUNT PILL */}
        <div className="bg-white text-[#1A2B4C] inline-block px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-full font-black text-[10px] sm:text-[11px] uppercase tracking-[0.25em] shadow-xl">
          ₹999 Off on Final Settlement
        </div>

        {/* INFO / WARNING CARDS */}
        <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 text-left">
          
          {/* SECURITY WARNING */}
          <div className="bg-[#991B1B33] border border-[#991B1B66] rounded-2xl sm:rounded-[22px] p-4 sm:p-5 flex gap-3 sm:gap-4">
            <FaExclamationTriangle className="text-red-400 text-base sm:text-lg flex-shrink-0 mt-0.5" />
            <div>
              <h6 className="text-[9px] sm:text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">
                Security Warning
              </h6>
              <p className="text-[9px] sm:text-[10px] text-white/75 font-bold leading-relaxed uppercase tracking-tight mt-1">
                This coupon code is valid for a single use only. Do not share it
                with anyone. If a third party uses your code, you will be held
                solely responsible. We allocate only one setup slot per
                registration id at the time of booking.
              </p>
            </div>
          </div>

          {/* GST INFO */}
          <div className="bg-[#1c2642] border border-white/10 rounded-2xl sm:rounded-[22px] p-4 sm:p-5 flex gap-3 sm:gap-4">
            <FaRegFileAlt className="text-slate-400 text-base sm:text-lg flex-shrink-0 mt-0.5" />
            <div>
              <h6 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                GST Claim Information
              </h6>
              <p className="text-[9px] sm:text-[10px] text-white font-bold leading-relaxed uppercase tracking-tight mt-1">
                Please note: When you complete the final project payment using
                this coupon code, you will be able to download your final GST
                invoice from the dashboard, which can be officially used for
                your gst tax claims.
              </p>
            </div>
          </div>

          {/* PAYMENT DEADLINE */}
          <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[22px] p-4 sm:p-5 flex gap-3 sm:gap-4">
            <MdAccessTime className="text-red-400 text-xl sm:text-2xl flex-shrink-0 mt-0.5" />
            <div>
              <h6 className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.2em]">
                Payment Deadline
              </h6>
              <p className="text-[9px] sm:text-[10px] text-white font-bold leading-relaxed uppercase tracking-tight mt-1">
                Remaining full payment must be completed within{" "}
                <span className="text-red-400">24 hours</span>. Your
                software/portal will be live within{" "}
                <span className="text-red-400">48 hours</span> post full
                payment.
              </p>
            </div>
          </div>

          {/* REFUND POLICY */}
          <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[22px] p-4 sm:p-5 flex gap-3 sm:gap-4">
            <TbCreditCardRefund className="text-red-400 text-xl sm:text-2xl flex-shrink-0 mt-0.5" />
            <div>
              <h6 className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-[0.2em]">
                Refund Policy
              </h6>
              <p className="text-[9px] sm:text-[10px] text-white font-bold leading-relaxed uppercase tracking-tight mt-1">
                The ₹999 booking amount is{" "}
                <span className="text-red-400">strictly non-refundable</span>.
                Once booked, this amount will not be returned under any
                circumstances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
