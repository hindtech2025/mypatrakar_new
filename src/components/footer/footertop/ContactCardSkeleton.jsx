const ContactCardSkeleton = () => {
  return (
    <div className="max-w-md w-full rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 p-6 shadow-xl animate-pulse">
      {/* Title */}
      <div className="space-y-3 mb-6">
        <div className="h-8 w-3/4 rounded bg-slate-700" />
        <div className="h-8 w-2/3 rounded bg-slate-700" />
      </div>

      {/* Description */}
      <div className="space-y-2 mb-8">
        <div className="h-4 w-full rounded bg-slate-700" />
        <div className="h-4 w-11/12 rounded bg-slate-700" />
        <div className="h-4 w-9/12 rounded bg-slate-700" />
      </div>

      {/* CTA */}
      <div className="h-8 w-40 rounded bg-slate-700 mb-8" />

      {/* Contact Items */}
      <div className="space-y-5">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            {/* Icon */}
            <div className="h-10 w-10 rounded-full bg-slate-700" />

            {/* Text */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-slate-700" />
              {i === 2 && (
                <div className="h-4 w-1/2 rounded bg-slate-700" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactCardSkeleton;
