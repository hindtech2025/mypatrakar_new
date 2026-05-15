import React from "react"

import Home from "../AdminDashbord/Home";
import AfterLoginDashboard from "./AfterLoginDashbord";
import { Helmet } from "react-helmet-async";
export default function UserPortal() {
  const logoUrl = "https://mypatrakar.com/assets/LG2-CcMgpPb7.svg";
  
  return (
       <>
       {/* SEO Optimized Helmet */}
      <Helmet>
        <title>User Dashboard - MyPatrakar</title>
        <meta name="description" content="Access your personalized user dashboard on MyPatrakar. Manage your news portal, view reports, and control your account settings easily." />
        <meta name="keywords" content="user dashboard, news portal, journalist dashboard, manage news website, media portal" />
        <meta name="author" content="MyPatrakar" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content="User Dashboard - MyPatrakar" />
        <meta property="og:description" content="Manage your news portal and account settings with ease on MyPatrakar's user dashboard." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mypatrakar.com/portal" />
        <meta property="og:image" content={logoUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="User Dashboard - MyPatrakar" />
        <meta name="twitter:description" content="Manage your journalist portal with ease." />
        <meta name="twitter:image" content={logoUrl}/>

        {/* Canonical URL */}
        <link rel="canonical" href="https://mypatrakar.com/portal" />

        {/* Structured Data for Google */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "User Dashboard - MyPatrakar",
            "url": "https://mypatrakar.com/portal",
            "description": "Access your personalized user dashboard on MyPatrakar. Manage your news portal, view reports, and control your account settings easily.",
            "image":logoUrl,
            "publisher": {
              "@type": "Organization",
              "name": "MyPatrakar",
              "logo": logoUrl
            }
          })}
        </script>
      </Helmet>
    <div className=" ">
      <Home>
        <AfterLoginDashboard />
      </Home>
    </div>
       </>
  );
}
