import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  X,
  Info,
  ChevronRight,
  Users,
  Coffee,
} from "lucide-react";

const EventConfirm = ({ close }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
 
    setIsAnimating(true);
  }, []);

  const handleClose = () => {
    close(false);
    setIsOpen(false);
  };

  return (
    <div className=" font-sans relative overflow-hidden">
      {/* --- BACKGROUND CONTENT (Blurry for effect) --- */}
      {/* <nav className="w-full bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#16274F] font-bold text-xl">
          <Newspaper className="w-6 h-6 text-[#FE0101]" />
          <span>My Patrakar</span>
        </div>
        <div className="hidden sm:flex gap-4 md:gap-6 text-sm font-medium text-slate-600">
          <span>Home</span>
          <span>About</span>
          <span>Features</span>
        </div>
      </nav> */}

      {/* <main className="max-w-6xl mx-auto px-6 py-11 flex flex-col items-center text-center space-y-8 opacity-50 filter blur-[2px]">
        <h1 className="text-3xl md:text-6xl font-extrabold text-[#16274F] tracking-tight">
          The Next Chapter of <br className="hidden md:block" /> Digital Journalism
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-slate-600">
          The ultimate tool for modern journalists.
        </p>
        <div className="h-48 md:h-64 w-full max-w-3xl bg-slate-200 rounded-xl animate-pulse"></div>
      </main> */}

      {/* --- RESPONSIVE MODAL --- */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop (Dark Overlay) */}
          <div
            className={`absolute inset-0 bg-[#16274F]/80 backdrop-blur-sm transition-opacity duration-500 ${isAnimating ? "opacity-100" : "opacity-0"}`}
            onClick={handleClose}
          ></div>

          {/* Modal Box */}
          <div
            className={`
              relative w-full max-w-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden 
              transform transition-all duration-500 ease-out border border-slate-100
              max-h-[95vh] flex flex-col
              ${isAnimating ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"}
            `}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-slate-400 hover:text-white hover:bg-[#FE0101] rounded-full p-1.5 transition-all z-20"
            >
              <X size={18} />
            </button>

            {/* Scrollable Content Container */}
            <div className="overflow-y-auto custom-scrollbar">
              {/* 1. Header Section */}
              <div className="bg-[#16274F] p-5 md:p-6 text-center relative overflow-hidden">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FE0101]/20 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center p-1 px-3 bg-white/10 rounded-lg mb-2 border border-white/10">
                    <span className="text-white text-[10px] font-bold tracking-wider uppercase">
                      Coming Soon
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
                    My Patrakar
                  </h2>
                  <p className="text-blue-100/80 text-xs md:text-sm font-medium">
                    The Next Chapter of Digital Journalism
                  </p>
                </div>
              </div>

              {/* 2. Body Content */}
              <div className="p-5 md:p-6 space-y-4 md:space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-[#16274F] font-bold text-lg">नमस्ते 🙏</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    You are cordially invited to the official product launch
                    event of{" "}
                    <span className="font-semibold text-[#16274F]">
                      My Patrakar
                    </span>
                    . This event is exclusively for{" "}
                    <span className="font-semibold text-[#FE0101]">
                      Journalists & Media Professionals
                    </span>
                    .
                  </p>
                </div>

                {/* Event Details Grid */}
                <div className="bg-slate-50 rounded-xl border border-slate-100 p-3 md:p-4 grid gap-3">
                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-[#FE0101] shrink-0">
                      <Calendar size={16} />
                    </div>
                    <div>
                      <h4 className="text-[#16274F] font-semibold text-[10px] md:text-xs uppercase tracking-wide">
                        Date
                      </h4>
                      <p className="text-slate-700 text-sm font-medium">
                        26 Jan 2026 (Republic Day)
                      </p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-[#FE0101] shrink-0">
                      <Clock size={16} />
                    </div>
                    <div>
                      <h4 className="text-[#16274F] font-semibold text-[10px] md:text-xs uppercase tracking-wide">
                        Time
                      </h4>
                      <p className="text-slate-700 text-sm font-medium">
                        3:00 PM to 5:00 PM
                      </p>
                    </div>
                  </div>

                  {/* Seats */}
                  <div className="flex items-start gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-[#FE0101] shrink-0">
                      <Users size={16} />
                    </div>
                    <div>
                      <h4 className="text-[#16274F] font-semibold text-[10px] md:text-xs uppercase tracking-wide">
                        Capacity
                      </h4>
                      <p className="text-slate-700 text-sm font-medium">
                        Only 50 Seats | Refreshments Included{" "}
                        <Coffee className="inline w-3 h-3 ml-1 text-slate-400" />
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-[#FE0101] shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <h4 className="text-[#16274F] font-semibold text-[10px] md:text-xs uppercase tracking-wide">
                        Venue
                      </h4>
                      <p className="text-slate-700 text-xs md:text-sm font-medium leading-snug">
                        Ground Floor, Sector 10, Indira Nagar, Lucknow, UP –
                        226016
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-md">
                  <div className="flex gap-2">
                    <Info
                      className="text-amber-600 shrink-0 mt-0.5"
                      size={14}
                    />
                    <p className="text-[11px] md:text-xs text-amber-900 leading-relaxed font-medium">
                      Seats:{" "}
                      <span className="font-bold">
                        First Come, First Served
                      </span>
                      . Confirmation will be sent via WhatsApp/Email.
                    </p>
                  </div>
                </div>

                {/* 3. CTA */}
                <div className="space-y-2">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScbjBxrGkCENyuTK46SQ20uS6q6rknnOcThXJlIncvPuyta0A/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full flex items-center justify-center gap-2 bg-[#FE0101] hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-red-900/20 transform active:scale-[0.98]"
                  >
                    Register Now
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                  <p className="text-center text-[10px] text-slate-400 font-medium">
                    Please provide accurate information. Single registration per
                    person only.{" "}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Footer */}
            <div className="bg-slate-50 border-t border-slate-100 py- text-center">
              <p className="text-[10px] text-slate-400">
                © 2026 My Patrakar. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventConfirm;
