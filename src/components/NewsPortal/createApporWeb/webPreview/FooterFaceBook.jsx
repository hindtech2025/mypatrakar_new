// import { useEffect, useState, useMemo } from "react";

// export default function FooterFaceBook({ url = "HindtechLucknow" }) {
//   const [facebookUrl, setFacebookUrl] = useState("HindtechLucknow");

//   useEffect(() => {
//     if (!url) return;

//     try {
//       // Clean up URL by removing any trailing slashes
//       const cleanedUrl = url.trim().replace(/\/+$/, '');
      
//       // Handle cases where URL might be just a username
//       if (!cleanedUrl.includes('facebook.com') && !cleanedUrl.startsWith('http')) {
//         setFacebookUrl(cleanedUrl);
//         return;
//       }

//       const fbUrl = new URL(
//         cleanedUrl.startsWith("http") ? cleanedUrl : `https://${cleanedUrl}`
//       );

//       // Extract the page name more reliably
//       const fbPage = fbUrl.pathname.split("/").filter(Boolean)[0] || 
//                     fbUrl.hostname.split(".")[0];

//       if (fbPage) {
//         setFacebookUrl(fbPage);
//       }
//     } catch (err) {
//       console.error("Invalid Facebook URL:", url);
//       setFacebookUrl("HindtechLucknow");
//     }
//   }, [url]);

//   const iframeSrc = useMemo(() => {
//     return `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
//       `https://www.facebook.com/${facebookUrl}`
//     )}&tabs=timeline&small_header=true&width=340&adapt_container_width=true&hide_cover=false&show_facepile=true`;
//   }, [facebookUrl]);

//   return (
//     <div className="flex justify-center items-center mt-3 ">
//       <div className="w-[200px] max-w-[200px]">
//         <iframe
//           src={iframeSrc}
//           className="w-full h-[170px] border-none rounded-md overflow-hidden"
//           scrolling="no"
//           frameBorder="0"
//           allowFullScreen
//           allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
//           title="Facebook Page Plugin"
//           loading="lazy"
//         />
//       </div>
//     </div>
//   );
// }import { useEffect, useState, useMemo } from "react";
import React, { useEffect, useMemo, useState } from "react";

function FooterFaceBookComponent({ url }) {
  const [facebookPageUrl, setFacebookPageUrl] = useState(
    "https://www.facebook.com/HindtechLucknow"
  );
// console.log(url)
  useEffect(() => {
    if (!url) return;

    try {
      let cleanedUrl = url.trim();

      // Only username given → make full URL
      if (!cleanedUrl.includes("facebook.com")) {
        cleanedUrl = `https://www.facebook.com/${cleanedUrl}`;
      }

      // Add https if missing
      if (!cleanedUrl.startsWith("http")) {
        cleanedUrl = `https://${cleanedUrl}`;
      }

      // Validate URL
      const fbUrl = new URL(cleanedUrl);
      setFacebookPageUrl(fbUrl.href);
    } catch (err) {
      // console.error("Invalid Facebook URL:", url);
      setFacebookPageUrl("https://www.facebook.com/HindtechLucknow");
    }
  }, [url]);

  const pluginWidth = 170;
  const pluginHeight = 200;

  const iframeSrc = useMemo(() => {
    return `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
      facebookPageUrl
    )}&tabs=timeline&width=${pluginWidth}&height=${pluginHeight}&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`;
  }, [facebookPageUrl]);

  return (
    <div className="flex justify-center items-center mt-3">
      <iframe
        src={iframeSrc}
        width={pluginWidth}
        height={pluginHeight}
        style={{ border: "none", overflow: "hidden", borderRadius: "12px" }}
        scrolling="no"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="Facebook Page Plugin"
        loading="lazy"
      />
    </div>
  );
}

// ✅ Wrap with React.memo
export default React.memo(FooterFaceBookComponent);
