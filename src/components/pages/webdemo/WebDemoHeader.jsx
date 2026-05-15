import { Newspaper, ShieldCheck } from "lucide-react";

const WebDemoHeader = () => {
  return (
    <header className="relative w-full bg-white border-b border-slate-200 overflow-hidden shadow-sm">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-navy-900"></div>
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-50 rounded-2xl border border-red-100 mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/20">
              <Newspaper size={18} className="text-white" />
            </div>
            <span className="text-xs font-black text-red-600 uppercase tracking-[0.2em]">
              MyPatrakaar Brand Studio v2.0
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Architect Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              Digital Newsroom
            </span>
          </h1>

          <p className="text-slate-500 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Define the visual soul of your brand. Customize logos, typography,
            and color schemes for a world-class journalistic presence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Live Preview Active
              </span>
            </div>
            <div className="w-[1px] h-4 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-slate-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Enterprise Ready
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
    </header>
  );
};

export default WebDemoHeader;