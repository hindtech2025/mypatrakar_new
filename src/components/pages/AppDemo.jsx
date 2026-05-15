import React, { useState } from "react";
import googlePlay from "../../assets/appdemo/googlePlay.png";
import appStore from "../../assets/appdemo/appStore.png";
import demoAppScreen1 from "../../assets/appdemo/demoAppScreen1.png";
import demoAppScreen2 from "../../assets/appdemo/demoAppScreen2.png";
import demoAppScreen3 from "../../assets/appdemo/demoAppScreen3.png";
import {
  Palette,
  LayoutTemplate,
  CheckCircle2,
  Newspaper,
  Tv2,
  SlidersHorizontal,
} from "lucide-react";
import EventConfirm from "../EventConfirm";
const AppDemoLanding = () => {
  const [open, close] = useState(false);
  return (
    <>
      <div className="text-slate-800 mt-20 -z-50 antialiased bg-white font-sans selection:bg-red-100">
        {/* Custom Styles for Grid and Float */}
        <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #f1f5f9 1px, transparent 1px),
                            linear-gradient(to bottom, #f1f5f9 1px, transparent 1px);
          background-size: 40px 40px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

        {/* Hero Section */}
        <header className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-grid-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-[#16274F] text-sm font-semibold mb-8 border border-slate-200">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FE0101]"></span>
                </span>
                Live Preview Available Now
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                See Your Own News App <br />
                <span className="text-[#FE0101]">Before You Buy It</span>
              </h1>
              <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {`Don't`} just imagine it. Download our app and experience a
                real-time demo of your own fully branded news application.
                Customize colors, fonts, and layouts instantly.
              </p>
             

              <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
                {/* Google Play Button */}
                <button
                  onClick={() => close(!open)}
                  className="w-full sm:w-auto  transition-all duration-300 hover:-translate-y-1 active:scale-95"
                >
                  <img
                    src={googlePlay}
                    alt="Get it on Google Play"
                    className="h-[100px] md:h-[70px] md:w-auto w-full  md:object-fill object-fill drop-shadow-lg rounded-xl"
                  />
                </button>

                <button
                  onClick={() => close(!open)}
                  className="w-full sm:w-auto transition-all duration-300 hover:-translate-y-1 active:scale-95"
                >
                  <img
                    src={appStore}
                    alt="Download on the App Store"
                    className="h-[100px] md:h-[70px] md:w-auto w-full  md:object-fill object-fill drop-shadow-lg rounded-xl"
                  />
                </button>
              </div>
            </div>
          </div>
          {/* Background Gradient Blurs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl -z-10 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-400 rounded-full blur-3xl mix-blend-multiply filter animate-float"></div>
            <div
              className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-900 rounded-full blur-3xl mix-blend-multiply filter animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </header>
        {/* Features Section */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
            {/* Feature 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <PhoneMockup rotation="-rotate-2" image={demoAppScreen1} />
              </div>
              <div className="w-full lg:w-1/2">
                <FeatureIcon
                  icon={<Palette className="w-6 h-6" />}
                  color="text-[#FE0101]"
                  bg="bg-red-50"
                  border="border-red-100"
                />

                <h2 className="text-3xl font-bold text-[#16274F] mb-4">
                  Customize Your App Instantly
                </h2>

                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Personalize every visual detail of your application with
                  real-time preview. Upload your logo, set your app name, choose
                  typography, language, and theme color — and see changes
                  applied instantly.
                </p>

                <FeatureList
                  items={[
                    "Upload and edit your app logo",
                    "Set your application name and branding",
                    "Choose typography with live preview",
                    "Select preferred app language",
                    "Pick application theme color instantly",
                    "View real-time branding updates",
                  ]}
                  iconColor="text-[#FE0101]"
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                <PhoneMockup rotation="rotate-2" image={demoAppScreen2} />
              </div>
              <div className="w-full lg:w-1/2 lg:text-right">
                <div className="flex lg:justify-end">
                  <FeatureIcon
                    icon={<LayoutTemplate className="w-6 h-6" />}
                    color="text-[#16274F]"
                    bg="bg-slate-100"
                    border="border-slate-200"
                  />
                </div>

                <h2 className="text-3xl font-bold text-[#16274F] mb-4">
                  App Theme & Bottom Bar Styling
                </h2>

                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Control the complete visual appearance of your app. Choose
                  application theme colors, customize bottom navigation
                  background, and fine-tune icon and text colors with an instant
                  live preview.
                </p>

                <FeatureList
                  items={[
                    "Select primary application theme color",
                    "Customize bottom navigation background color",
                    "Change bottom bar icon & text colors",
                    "Preview navigation design in real time",
                    "Ensure consistent branding across the app",
                  ]}
                  iconColor="text-[#16274F]"
                  reverse={true}
                />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2 flex  justify-center lg:justify-end">
                <PhoneMockup rotation="-rotate-2" image={demoAppScreen3} />
              </div>
              <div className="w-full lg:w-1/2">
                <FeatureIcon
                  icon={<span className="text-xl font-extrabold ">S</span>}
                  color="text-[#FE0101]"
                  bg="bg-red-50"
                  border="border-red-100"
                />
                <h2 className="text-3xl font-bold text-[#16274F] mb-4">
                  Support & Social Connectivity
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Provide your users with direct access to support and stay
                  connected across all major social platforms. Add customer
                  support numbers, WhatsApp contact, and social media links that
                  appear seamlessly inside your app.
                </p>
                <FeatureList
                  items={[
                    "Add customer support phone number",
                    "Enable WhatsApp support contact",
                    "Link Facebook, Twitter & Instagram profiles",
                    "Connect YouTube and LinkedIn channels",
                    "Include Telegram and Koo profile links",
                    "Apply changes instantly across the app",
                  ]}
                  iconColor="text-[#FE0101]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#16274F] mb-6">
              Why Try the Demo Mode?
            </h2>
            <p className="text-lg text-slate-600 mb-12">
              This isn't a pre-recorded video or a static slideshow. You are
              interacting with the actual codebase that powers MyPatrakar news
              apps.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TrustCard
                icon={<Newspaper />}
                title="For Journalists"
                desc="See how your articles and categories will appear on a professional platform."
                color="text-[#FE0101]"
                bg="bg-red-50"
              />
              <TrustCard
                icon={<Tv2 />}
                title="For News Channels"
                desc="Visualize your channel's branding and color scheme in a live environment."
                color="text-[#16274F]"
                bg="bg-blue-50"
              />
              <TrustCard
                icon={<SlidersHorizontal />}
                title="Zero Coding Needed"
                desc="Customize your app settings visually without needing any technical knowledge."
                color="text-[#FE0101]"
                bg="bg-red-50"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#16274F] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-red-600 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Don’t Imagine Your News App.
              <br />
              Experience It.
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Download the MyPatrakar app, enable Demo Mode, and watch your
              brand come alive in seconds.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Google Play Button */}
              <button
                onClick={() => close(!open)}
                className="w-full sm:w-auto transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <img
                  src={googlePlay}
                  alt="Get it on Google Play"
                  className="h-[100px] md:h-[70px] md:w-auto w-full  md:object-fill object-fill drop-shadow-lg rounded-xl"
                />
              </button>

              <button
                onClick={() => close(!open)}
                className="w-full sm:w-auto transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                <img
                  src={appStore}
                  alt="Download on the App Store"
                  className="h-[100px] md:h-[70px] md:w-auto w-full  md:object-fill object-fill drop-shadow-lg rounded-xl"
                />
              </button>
            </div>
          </div>
        </section>
      </div>
      {open && <EventConfirm close={close} />}
    </>
  );
};
// --- Sub-components for cleaner code ---
const PhoneMockup = ({ rotation, image }) => (
  <div
    className={`phone-mockup relative border-[12px] border-[#16274F] rounded-[2.5rem] overflow-hidden bg-white shadow-2xl max-w-[320px] aspect-[9/19] transform ${rotation} hover:rotate-0 transition duration-500`}
  >
    {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-6 bg-[#16274F] rounded-b-xl z-10"></div> */}

    <div className="w-full h-full bg-slate-50 flex items-center  justify-center text-center relative overflow-hidden">
      <img
        src={image}
        alt="App Screenshot"
        className="w-[320px] h-[680px] object-fill rounded-[2.5rem]"
      />
      {/* <span className="absolute text-black font-extrabold  text-4xl">
        {imageText}
      </span> */}
    </div>
  </div>
);

const FeatureIcon = ({ icon, color, bg, border }) => (
  <div
    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} ${color} mb-6 border ${border}`}
  >
    {icon}
  </div>
);

const FeatureList = ({ items, iconColor, reverse = false }) => (
  <ul className={`space-y-3 flex flex-col ${reverse ? "lg:items-end" : ""}`}>
    {items.map((text, i) => (
      <li
        key={i}
        className={`flex items-center gap-3 text-slate-700 ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <CheckCircle2 className={`w-5 h-5 ${iconColor}`} />
        <span>{text}</span>
      </li>
    ))}
  </ul>
);

const TrustCard = ({ icon, title, desc, color, bg }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
    <div
      className={`w-12 h-12 ${bg} ${color} rounded-full flex items-center justify-center mx-auto mb-4`}
    >
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500">{desc}</p>
  </div>
);

export default AppDemoLanding;
