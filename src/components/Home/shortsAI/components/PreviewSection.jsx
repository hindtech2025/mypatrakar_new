import ShortCard from "./ShortsCard";
export default function PreviewSection({ generatedShort, loading = true }) {
  return (
    <div className="flex flex-col justify-start items-center b rounded-xl">
      {loading||generatedShort=="Error generating content."  ||generatedShort?.image===""||generatedShort.description==="" ? (
        <div>
          <div className="animate-pulse w-full">
            <div className="h-[266px] w-[300px] md:w-[512px] bg-[#F1F5F9] rounded-xl mb-4"></div>
            <div className="h-3 rounded-lg bg-[#F1F5F9] w-11/12 md:w-[512px] mb-2"></div>
            <div className="h-3 rounded-lg bg-[#F1F5F9] w-3/4 mb-2"></div>
            <div className="h-3 rounded-lg bg-[#F1F5F9] w-1/2"></div>
          </div>
          <div>
            <p className="text-[#334155] text-[18px] font-bold text-start mt-2 font-sans">
              Your Short will appear here <br />
            </p>
            <span className="text-[16px] font-sans text-[#64748B]">
              Generated description will appear here
            </span>
          </div>
        </div>
      ) : (
        <ShortCard
      generatedShort={generatedShort}
        />
      )}
    </div>
  );
}
