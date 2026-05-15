import React, { useEffect, useState } from "react";
// import HtmlToPlainText from "../Blog/BlogPages/HtmlToPlainText";
import { Terms_Conditions } from "../../../api";
import HtmlToPlainText from "../Blog/BlogPages/HtmlToPlainText";
import { Helmet } from "react-helmet-async";

export default function TermsAndConditions() {
  const [content, setContent] = useState("");
  const showTerms = async () => {
    try {
      const res = await Terms_Conditions();
      setContent(res.data.response);
      // console.log(res);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    showTerms();
  }, []);
  const logoUrl = "https://mypatrakar.com/assets/LG2-CcMgpPb7.svg";
  return (
    <>
      <Helmet>
        {/* Title with SEO Optimized Keywords */}
        <title>
          Terms & Conditions | MyPatrakar - User Rights & Legal Policies
        </title>

        {/* Meta Description for Higher Click-Through Rates (CTR) */}
        <meta
          name="description"
          content="Understand MyPatrakar's Terms & Conditions, user rights, and legal guidelines. Stay informed about our policies for a secure and transparent experience."
        />

        {/* SEO Optimized Keywords */}
        <meta
          name="keywords"
          content="MyPatrakar Terms and Conditions, User Policies, Legal Guidelines, Website Terms, MyPatrakar Rules, Privacy Agreement, Online Journalism Terms"
        />

        {/* Indexing Instructions for Search Engines */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags (For Facebook & LinkedIn) */}
        <meta
          property="og:title"
          content="MyPatrakar Terms & Conditions - Know Your Rights"
        />
        <meta
          property="og:description"
          content="Read MyPatrakar's Terms & Conditions to understand our policies, legal guidelines, and user responsibilities."
        />
        <meta property="og:image" content={logoUrl} />
        <meta
          property="og:url"
          content="https://mypatrakar.com/terms-and-conditions"
        />
        <meta property="og:type" content="article" />

        {/* Twitter Card Meta Tags (For Twitter Previews) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="MyPatrakar Terms & Conditions - User Guidelines & Policies"
        />
        <meta
          name="twitter:description"
          content="Stay updated with MyPatrakar's user policies, terms of service, and legal agreements."
        />
        <meta name="twitter:image" content={logoUrl} />

        {/* Schema.org JSON-LD Markup for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms & Conditions - MyPatrakar",
            url: "https://mypatrakar.com/terms-and-conditions",
            description:
              "Explore MyPatrakar's Terms & Conditions, including user responsibilities, policies, and legal agreements.",
            publisher: {
              "@type": "Organization",
              name: "MyPatrakar",
              url: "https://mypatrakar.com",
              logo: logoUrl,
            },
          })}
        </script>
      </Helmet>
      <div className="container mt-36">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-2">Terms and Conditions</h1>
          <p className="text-lg mb-2">
            By using MyPatrakar, you agree to the following terms
          </p>
          {/* <small className="text-gray-500">Updated 1 October, 2024</small> */}
        </div>
        <hr className="my-5" />
        <div className="flex items-start justify-start mb-5">
          <HtmlToPlainText htmlContent={content.content} id={content.id} />
        </div>
      </div>
    </>
  );
}
