import React from "react";

import AppViewOnHome from "./AppViewOnHome";
import Features from "./Features";
import Functionality from "./Functionality";
import Hero from "./Hero/Hero";
import Instructions from "./Instructions";
import OurReporters from "./OurReporters";
import Pricing from "./price/Pricing";
// import logo from '../../assets/LG2.svg'
import { Helmet } from "react-helmet-async";
export default function Home() {
  const logoUrl = "https://mypatrakar.com/assets/LG2-CcMgpPb7.svg";
  return (
    <>
     <Helmet>
        <title>MyPatrakar | Complete News Portal Development Solution</title>
        <meta
          name="description"
          content="MyPatrakar is the one-stop solution for building a complete news portal."
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta for Social Media Sharing */}
        <meta
          property="og:title"
          content="MyPatrakar - Best Journalist Platform"
        />
        <meta
          property="og:description"
          content="Create your own journalism website with MyPatrakar."
        />
        <meta property="og:image" content={logoUrl} />
        <meta property="og:url" content="https://mypatrakar.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card for Twitter Previews */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="MyPatrakar - Best Journalist Platform"
        />
        <meta
          name="twitter:description"
          content="Create your own journalism website with MyPatrakar."
        />
        <meta name="twitter:image" content={logoUrl} />

        {/* Schema.org JSON-LD for Google Logo Display */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MyPatrakar",
            url: "https://mypatrakar.com",
            logo: logoUrl, // Updated absolute URL
          })}
        </script>
      </Helmet>
      {/* <NavBar/> */}
      <div className="mx-auto max-w-screen-2xl">
        <main>
          {/* {renderContent()} */}
          <Hero />
          <OurReporters />
          <Instructions />
          <AppViewOnHome />
          <Functionality />
          <Features />
          <Pricing />
        </main>
      </div>
      {/* <Footer/> */}
    </>
  );
}
