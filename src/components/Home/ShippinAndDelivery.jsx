import React from "react";
import { Helmet } from "react-helmet-async";

const ShippinAndDelivery = () => {
  const logoUrl = "https://mypatrakar.com/assets/LG2-CcMgpPb7.svg";

  return (
    <>
      <Helmet>
        {/* Title with Strong Keywords */}
        <title>
          Privacy Policy | MyPatrakar - Secure & Transparent Data Protection
        </title>

        {/* SEO Optimized Meta Description */}
        <meta
          name="description"
          content="Explore MyPatrakar's Privacy Policy to understand how we securely collect, store, and protect your personal data. 100% GDPR-compliant. Your security, our priority."
        />

        {/* Targeted Keywords for Higher Ranking */}
        <meta
          name="keywords"
          content="Privacy Policy, MyPatrakar Data Security, GDPR compliance, Online Privacy Protection, Personal Data Handling, Secure Information Management, News Platform Privacy"
        />

        {/* Indexing Instructions */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags (For Social Media Previews) */}
        <meta
          property="og:title"
          content="MyPatrakar Privacy Policy - Your Data, Your Rights"
        />
        <meta
          property="og:description"
          content="Read MyPatrakar's privacy policy to understand how we handle your data securely and transparently."
        />
        <meta property="og:image" content={logoUrl} />
        <meta
          property="og:url"
          content="https://mypatrakar.com/privacy-policy"
        />
        <meta property="og:type" content="article" />

        {/* Twitter Card Meta Tags (For Twitter Sharing) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="MyPatrakar Privacy Policy - Secure & Transparent"
        />
        <meta
          name="twitter:description"
          content="Find out how MyPatrakar protects your personal data with the highest security standards."
        />
        <meta name="twitter:image" content={logoUrl} />

        {/* Schema.org JSON-LD Markup for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy - MyPatrakar",
            url: "https://mypatrakar.com/privacy-policy",
            description:
              "MyPatrakar's Privacy Policy outlines how we securely collect, process, and protect your personal information.",
            publisher: {
              "@type": "Organization",
              name: "MyPatrakar",
              url: "https://mypatrakar.com",
              logo: logoUrl,
            },
          })}
        </script>
      </Helmet>
      <div className="container mt-24 mx-auto max-w-3xl   text-gray-800">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-3 text-gray-700">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Protecting your privacy is our priority.
          </p>
        </div>
        <hr className="my-5 border-gray-300" />
        <p className="leading-relaxed text-gray-700">
          Welcome to{" "}
          <span className="font-semibold">MyPatrakar</span>. We are
          committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, and protect your information when you use our website
          <a
            href="https://mypatrakar.com"
            className="text-gray-600 hover:underline"
          >
            https://mypatrakar.com
          </a>{" "}
          and our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-gray-700">
          1. Information We Collect
        </h2>
        <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, and other contact details.
          </li>
          <li>
            <strong>Technical Information:</strong> IP address, browser type,
            operating system, and other technical details.
          </li>
          <li>
            <strong>Usage Data:</strong> Details about how you use our website
            and services.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 text-gray-700">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
          <li>Provide and improve our services.</li>
          <li>Respond to inquiries and offer customer support.</li>
          <li>Send updates, promotions, and marketing materials.</li>
          <li>Analyze usage trends to enhance user experience.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 text-gray-700">
          3. Information Sharing
        </h2>
        <p className="text-gray-700 mt-2">
          We do not sell or rent your personal information to third parties.
          However, we may share your information with:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
          <li>Service providers who assist in delivering our services.</li>
          <li>Legal authorities, if required by law.</li>
          <li>Third parties, with your explicit consent.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 text-gray-700">
          4. Data Security
        </h2>
        <p className="text-gray-700 mt-2">
          We implement robust security measures to protect your information.
          However, no method of transmission over the internet is completely
          secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-gray-700">
          5. Your Rights
        </h2>
        <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
          <li>Access the personal information we hold about you.</li>
          <li>Request corrections to inaccurate or incomplete data.</li>
          <li>
            Request deletion of your personal data, subject to legal
            obligations.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 text-gray-700">
          6. Cookies
        </h2>
        <p className="text-gray-700 mt-2">
          We use cookies to improve your browsing experience. By using our
          website, you consent to our use of cookies. You can manage your cookie
          preferences in your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-gray-700">
          7. Changes to This Privacy Policy
        </h2>
        <p className="text-gray-700 mt-2">
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with an updated {`Last Updated`} date.
        </p>

        <h2 className="text-2xl font-semibold mt-6 text-gray-700">
          8. Contact Us
        </h2>
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="mt-2">
            <strong>Address:</strong> Building No 10/703, Ground Floor, near
            Arvindo Park Road, Sector 10, Indira Nagar, Lucknow, Uttar Pradesh
            226016
          </p>
          <p className="mt-2">
            <strong>Phone:</strong>{" "}
            <a
              href="tel:917905320279"
              className="text-gray-600 hover:underline"
            >
              +91 7905320279
            </a>
          </p>
          <p className="mt-2">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:mypatrakar@gmail.com"
              className="text-gray-600 hover:underline"
            >
              mypatrakar@gmail.com
            </a>
          </p>
        </div>

        <p className="mt-6 text-gray-700 font-medium">
          Thank you for trusting{" "}
          <span className="font-semibold">MyPatrakar</span> with your
          information. We value your privacy and are dedicated to protecting it.
        </p>
      </div>
    </>
  );
};

export default ShippinAndDelivery;
