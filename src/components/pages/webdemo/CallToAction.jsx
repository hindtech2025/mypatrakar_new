import { ArrowRight } from "lucide-react";

const CallToAction = ({ onSubmit, isLoading = false }) => {
  return (
    <div className="bg-[#16274F] rounded-3xl sm:rounded-[2.5rem] max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-4 sm:mx-auto p-5 sm:p-6 md:p-8 text-center relative overflow-hidden group shadow-2xl shadow-navy-900/20">
      {/* Decorative Circle */}
      <div className="absolute top-0 right-0 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-red-600 rounded-full -mr-28 -mt-28 sm:-mr-36 sm:-mt-36 md:-mr-40 md:-mt-40 opacity-10 group-hover:scale-110 transition-transform duration-1000"></div>

      <div className="relative z-10 space-y-6 sm:space-y-8">
        {/* Heading */}
        <div className="space-y-2">
          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-black tracking-tight">
            Setup Complete?
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm font-medium">
            Verify your branding and colors before launching.
          </p>
        </div>

        {/* Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-[#FE0101] text-white w-full sm:w-3/4 md:w-2/3 py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-black text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] hover:shadow-[0_20px_40px_rgba(254,1,1,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 sm:gap-4 active:scale-95 shadow-lg shadow-red-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
            aria-label="Launch website"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                PROCESSING...
              </>
            ) : (
              <>
                LAUNCH WEBSITE
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;