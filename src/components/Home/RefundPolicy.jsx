import React from "react";
import { Helmet } from "react-helmet-async";

const RefundPolicy = () => {
  const logoUrl = "https://mypatrakar.com/assets/LG2-CcMgpPb7.svg";

  return (
    <>
     <Helmet>
      {/* Title with Strong Keywords */}
      <title>Refund Policy | MyPatrakar - Secure & Transparent Refund Process</title>

      {/* SEO-Optimized Meta Description */}
      <meta
        name="description"
        content="Read MyPatrakar's Refund Policy to understand our refund process, eligibility criteria, and user rights. Transparent policies for a secure experience."
      />

      {/* Optimized Keywords for Higher Ranking */}
      <meta
        name="keywords"
        content="MyPatrakar Refund Policy, Refund Guidelines, Payment Terms, User Rights, MyPatrakar Money Back Policy, Secure Refunds, Online Transaction Policies"
      />

      {/* Indexing Instructions for Search Engines */}
      <meta name="robots" content="index, follow" />

      {/* Open Graph Meta Tags (For Social Media Sharing) */}
      <meta property="og:title" content="MyPatrakar Refund Policy - Secure & Transparent Process" />
      <meta
        property="og:description"
        content="Explore MyPatrakar's Refund Policy, covering eligibility, refund processing, and user rights."
      />
      <meta property="og:image" content={logoUrl} />
      <meta property="og:url" content="https://mypatrakar.com/cancellation-and-refund-policy" />
      <meta property="og:type" content="article" />

      {/* Twitter Card Meta Tags (For Twitter Previews) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="MyPatrakar Refund Policy - Easy & Secure Process" />
      <meta
        name="twitter:description"
        content="Learn about MyPatrakar's refund eligibility and processing terms for secure transactions."
      />
      <meta name="twitter:image" content={logoUrl} />

      {/* Schema.org JSON-LD Markup for Google SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Refund Policy - MyPatrakar",
          "url": "https://mypatrakar.com/cancellation-and-refund-policy",
          "description": "Understand MyPatrakar's refund process, payment terms, and user rights for secure transactions.",
          "publisher": {
            "@type": "Organization",
            "name": "MyPatrakar",
            "url": "https://mypatrakar.com",
            "logo": {logoUrl}
          }
        })}
      </script>
    </Helmet>
      <div className="container mt-24 mx-auto max-w-3xl p-6  text-gray-800">
        <div className="text-center flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-3 text-gray-700">Refund Policy</h1>
          <p className="text-lg text-gray-600 mb-4">
            By using MyPatrakar, you agree to the following terms
          </p>
        </div>
        <hr className="my-5 border-gray-300" />
        <p className="leading-relaxed text-gray-700">
          At <span className="font-semibold">MyPatrakar</span>, we are committed to providing the best services to our clients. 
          However, please note that we do not offer any cancellation or refund policy. Once a transaction is completed or a 
          service is purchased, it cannot be reversed or refunded under any circumstances.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 text-gray-700">Why No Cancellation or Refund?</h2>
        <p className="text-gray-700 mt-2">
          Our no-cancellation and no-refund policy is in place because of the following reasons:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 space-y-2 text-gray-700">
          <li>The nature of IT services and solutions often involves resource allocation and upfront costs.</li>
          <li>Customized and tailored solutions are developed specifically for each client, making them non-transferable or reversible.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 text-gray-700">Our Commitment</h2>
        <p className="text-gray-700 mt-2">
          We strive to ensure that our services meet your expectations. To help avoid any confusion, we encourage clients to 
          thoroughly review their requirements and discuss any concerns with us before making a purchase.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 text-gray-700">Contact Us</h2>
        <p className="text-gray-700 mt-2">If you have any questions or need clarification, feel free to reach out to us:</p>
        <div className="mt-4 ">
          <p className="mt-2"><strong>Address:</strong> Building No 10/703, Ground Floor, near Arvindo Park Road, Sector 10, Indira Nagar, Lucknow, Uttar Pradesh 226016</p>
          <p className="mt-2"><strong>Phone:</strong> <a href="tel:7905320279" className="text-gray-600 hover:underline">+91 7905320279</a></p>
          <p className="mt-2"><strong>Email:</strong> <a href="mailto:mypatrakar@gmail.com" className="text-gray-600 hover:underline">mypatrakar@gmail.com</a></p>
        </div>
        
        <p className="mt-6 text-gray-700 font-medium">
          Thank you for understanding our policy and for choosing <span className="font-semibold">MyPatrakar</span>. Your cooperation is highly valued.
        </p>
      </div>
    </>
  );
};

export default RefundPolicy;
