// import { Helmet } from "react-helmet-async";
// import { PrivacyAndPolicy } from "../../../api";
// import HtmlToPlainText from "../Blog/BlogPages/HtmlToPlainText";
// import React, { useEffect, useState } from "react";

// const PrivacyPolicy = () => {
//   const [content, setContent] = useState("");
//   const showPrivacyAndPolicy = async () => {
//     try {
//       const res = await PrivacyAndPolicy();
//       setContent(res.data.response);
//       // console.log(res.data.response.content);
//     } catch (error) {
//       return <p>{error}</p>;
//     }
//   };
//   useEffect(() => {
//     showPrivacyAndPolicy();
//   }, []);
//   const logoUrl = "https://mypatrakar.com/assets/LG2-CcMgpPb7.svg";
//   return (
//     <>
//       <Helmet>
//         {/* Title with Strong Keywords */}
//         <title>
//           Privacy Policy | MyPatrakar - Secure & Transparent Data Protection
//         </title>
//         {/* SEO Optimized Meta Description */}
//         <meta
//           name="description"
//           content="Explore MyPatrakar's Privacy Policy to understand how we securely collect, store, and protect your personal data. 100% GDPR-compliant. Your security, our priority."
//         />
//         {/* Targeted Keywords for Higher Ranking */}
//         <meta
//           name="keywords"
//           content="Privacy Policy, MyPatrakar Data Security, GDPR compliance, Online Privacy Protection, Personal Data Handling, Secure Information Management, News Platform Privacy"
//         />
//         {/* Indexing Instructions */}
//         <meta name="robots" content="index, follow" />

//         {/* Open Graph Meta Tags (For Social Media Previews) */}
//         <meta
//           property="og:title"
//           content="MyPatrakar Privacy Policy - Your Data, Your Rights"
//         />
//         <meta
//           property="og:description"
//           content="Read MyPatrakar's privacy policy to understand how we handle your data securely and transparently."
//         />
//         <meta property="og:image" content={logoUrl} />
//         <meta
//           property="og:url"
//           content="https://mypatrakar.com/privacy-policy"
//         />
//         <meta property="og:type" content="article" />

//         {/* Twitter Card Meta Tags (For Twitter Sharing) */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta
//           name="twitter:title"
//           content="MyPatrakar Privacy Policy - Secure & Transparent"
//         />
//         <meta
//           name="twitter:description"
//           content="Find out how MyPatrakar protects your personal data with the highest security standards."
//         />
//         <meta name="twitter:image" content={logoUrl} />

//         {/* Schema.org JSON-LD Markup for SEO */}
//         <script type="application/ld+json">
//           {JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "WebPage",
//             name: "Privacy Policy - MyPatrakar",
//             url: "https://mypatrakar.com/privacy-policy",
//             description:
//               "MyPatrakar's Privacy Policy outlines how we securely collect, process, and protect your personal information.",
//             publisher: {
//               "@type": "Organization",
//               name: "MyPatrakar",
//               url: "https://mypatrakar.com",
//               logo: logoUrl,
//             },
//           })}
//         </script>
//       </Helmet>
//       <div className="container mt-36">
//         <div className="text-center flex flex-col items-center">
//           <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
//           <p className="text-lg mb-2">Learn how we handle your data</p>
//           {/* <small className="text-gray-500">Updated 1 October, 2024</small> */}
//         </div>
//         <hr className="my-5" />
//         <div className="flex items-start justify-start mb-5">
//           {content ? (
//             <HtmlToPlainText htmlContent={content.content} id={content.id} />
//           ) : (
//             <p className="text-center text-xl">Loading...</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default PrivacyPolicy;






import { Helmet } from "react-helmet-async";
import React from "react";

const PrivacyPolicy = () => {
  const privacyHtml = `
    <h1>Privacy Policy for My Patrakar</h1>
    <p><strong>Effective Date: 26/01/26</strong></p>
    <p>Welcome to My Patrakar (accessible at My Patrakar).<br />
    Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and mobile application.</p>

    <h2>1. About Us</h2>
    <p>My Patrakar is a digital platform that helps users create and manage:</p>
    <ul>
      <li>News portals</li>
      <li>Mobile applications</li>
      <li>Websites</li>
    </ul>
    <p>We provide ready-to-launch solutions (including rapid setup within 48 hours) for individuals, journalists, and businesses.</p>

    <h2>2. Information We Collect</h2>
    <p>We may collect the following types of information:</p>
    <h3>a. Personal Information</h3>
    <ul>
      <li>Name</li>
      <li>Email address</li>
      <li>Phone number</li>
      <li>Business details</li>
    </ul>
    <h3>b. Usage Data</h3>
    <ul>
      <li>App interactions</li>
      <li>Device information</li>
      <li>IP address</li>
      <li>Log data</li>
    </ul>
    <h3>c. Uploaded Content</h3>
    <ul>
      <li>News content</li>
      <li>Images/videos</li>
      <li>Website/app-related data</li>
    </ul>

    <h2>3. Permissions We Use</h2>
    <p>Our app may request the following permissions:</p>
    <div class="permission-grid">
      <div><strong>Microphone (RECORD_AUDIO)</strong><br />Voice search, Voice input</div>
      <div><strong>Internet Access (INTERNET)</strong><br />Fetching data, Loading content</div>
      <div><strong>Bluetooth</strong><br />Device connectivity</div>
      <div><strong>Phone Call (CALL_PHONE)</strong><br />Direct calling features</div>
      <div><strong>Notifications (POST_NOTIFICATIONS)</strong><br />Updates, Alerts</div>
    </div>
    <p>We only use these permissions when necessary for app functionality.</p>

    <h2>4. How We Use Your Information</h2>
    <ul>
      <li>Provide and improve our services</li>
      <li>Create and manage user websites/apps</li>
      <li>Enable communication</li>
      <li>Send updates and notifications</li>
      <li>Ensure security and prevent misuse</li>
    </ul>

    <h2>5. Data Sharing</h2>
    <p>We do <strong>NOT</strong> sell your personal data. We may share data only:</p>
    <ul>
      <li>With trusted service providers (hosting, analytics, etc.)</li>
      <li>When required by law</li>
      <li>To protect our legal rights</li>
    </ul>

    <h2>6. Data Security</h2>
    <p>We implement:</p>
    <ul>
      <li>Firewall protection</li>
      <li>Secure servers</li>
      <li>Encryption practices (where applicable)</li>
    </ul>
    <p>However, no system is 100% secure, and we cannot guarantee absolute security.</p>

    <h2>7. Third-Party Services</h2>
    <ul>
      <li>Analytics services</li>
      <li>Hosting providers</li>
      <li>API integrations</li>
    </ul>
    <p>These services may collect data according to their own privacy policies.</p>

    <h2>8. User Rights</h2>
    <p>You have the right to:</p>
    <ul>
      <li>Access your data</li>
      <li>Request correction</li>
      <li>Request deletion</li>
      <li>Withdraw consent</li>
    </ul>
    <p>To do so, contact us at: <a href="mailto:info@mypatrakar.com">info@mypatrakar.com</a></p>

    <h2>9. Children’s Privacy</h2>
    <p>Our services are not intended for users under the age of 13. We do not knowingly collect data from children.</p>

    <h2>10. Changes to This Policy</h2>
    <p>We may update this Privacy Policy from time to time. Changes will be posted on this page.</p>

    <h2>11. Contact Us</h2>
    <p>If you have any questions, contact us:</p>
    <ul>
      <li>Website: <a href="https://mypatrakar.com/">https://mypatrakar.com/</a></li>
      <li>Email: <a href="mailto:info@mypatrakar.com">info@mypatrakar.com</a></li>
      <li>Phone: <a href="tel:9005622459">9005622459</a> | <a href="tel:8176091467">8176091467</a></li>
    </ul>

    <h2>12. Consent</h2>
    <p>By using our app or website, you agree to this Privacy Policy.</p>
  `;

  const logoUrl = "https://mypatrakar.com/assets/LG2-CcMgpPb7.svg";

  return (
    <>
      <Helmet>
        <title>Privacy Policy | MyPatrakar - Secure & Transparent Data Protection</title>
        <meta
          name="description"
          content="Explore MyPatrakar's Privacy Policy to understand how we securely collect, store, and protect your personal data. 100% GDPR-compliant. Your security, our priority."
        />
        <meta
          name="keywords"
          content="Privacy Policy, MyPatrakar Data Security, GDPR compliance, Online Privacy Protection, Personal Data Handling, Secure Information Management, News Platform Privacy"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="MyPatrakar Privacy Policy - Your Data, Your Rights" />
        <meta
          property="og:description"
          content="Read MyPatrakar's privacy policy to understand how we handle your data securely and transparently."
        />
        <meta property="og:image" content={logoUrl} />
        <meta property="og:url" content="https://mypatrakar.com/privacy-policy" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MyPatrakar Privacy Policy - Secure & Transparent" />
        <meta
          name="twitter:description"
          content="Find out how MyPatrakar protects your personal data with the highest security standards."
        />
        <meta name="twitter:image" content={logoUrl} />
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
      <div className="container mx-auto px-4 py-8 mt-24 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Learn how we handle your data</p>
        </div>
        <div className="bg-white  p-6 md:p-10">
          <div
            className="prose prose-lg prose-slate max-w-none
              prose-headings:font-semibold prose-headings:text-gray-900
              prose-h1:text-3xl prose-h1:mb-6
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200
              prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-2
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-ul:my-4 prose-li:text-gray-700 prose-li:mb-1
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
            dangerouslySetInnerHTML={{ __html: privacyHtml }}
          />
        </div>
        <style>{`
          .permission-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 1rem;
            margin: 1.5rem 0;
          }
          .permission-grid div {
         
            padding: 0.75rem 1rem;
           
          }
          @media (max-width: 640px) {
            .permission-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default PrivacyPolicy;