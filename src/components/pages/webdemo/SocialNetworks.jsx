import { PiLinkSimpleBold } from "react-icons/pi";
import * as LucideIcons from "lucide-react";
import { socialInputs } from "./utils/webDemoHelpers";

const SocialNetworks = ({ socialLinks, setSocialLinks }) => {
  const getIconComponent = (iconName) => {
    return LucideIcons[iconName] || LucideIcons.Link;
  };

  return (
    <div className="space-y-6">
      <h3 className="px-2 text-xs font-black uppercase tracking-[0.2em] text-slate-800 flex items-center gap-2">
        <PiLinkSimpleBold className="text-red-500" size={16} /> Social Networks
      </h3>
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 space-y-10">
        <div className="grid grid-cols-1 gap-4">
          {socialInputs.map((social) => {
            const IconComponent = getIconComponent(social.icon);
            return (
              <div
                key={social.id}
                className="flex items-center gap-6 bg-slate-50 border border-slate-200 p-4 rounded-2xl focus-within:ring-4 focus-within:ring-red-500/10 focus-within:border-red-500 transition-all shadow-sm group"
              >
                <IconComponent
                  size={20}
                  className={`${social.color} transition-transform group-focus-within:scale-110`}
                />
                <input
                  type="url"
                  name={social.id}
                  placeholder={social.placeholder}
                  value={socialLinks[social.id]}
                  onChange={(e) =>
                    setSocialLinks({
                      ...socialLinks,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="bg-transparent border-none p-0 text-sm font-bold focus:ring-0 outline-none placeholder:text-slate-300 w-full"
                  aria-label={social.placeholder}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SocialNetworks;
