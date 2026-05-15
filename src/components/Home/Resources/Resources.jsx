import React, { useEffect, useState } from "react";
import FAQDropdown from "./FAQDropdown";
import { GetResources } from "../../../api";
import { Helmet } from "react-helmet-async";
import noDataImage from "../../../assets/no-data.avif"; // 👈 Add your fallback image path

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // API call to fetch resources
  const showResources = async () => {
    try {
      const res = await GetResources();
      const data = res?.data?.data || [];
      setResources(data);
    } catch (err) {
      // console.error("Failed to fetch resources:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showResources();
  }, []);

  return (
    <>
      <Helmet>
        <title>Resources | MyPatrakar - Guides, Tutorials & News Insights</title>
        <meta
          name="description"
          content="Explore MyPatrakar's resources, including guides, tutorials, and insights on news portal development, journalism, and digital media trends."
        />
        <meta
          name="keywords"
          content="MyPatrakar resources, journalism guides, news portal tutorials, digital media insights, online news development, blogging tips"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-white my-24 px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="font-sans text-4xl font-bold text-gray-800 mb-4 py-5">
            Frequently Asked Questions
          </h1>
          <p className="text-md font-medium text-gray-600">
            Get answers to your quick questions
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-500 text-lg py-10">
            Loading FAQs...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-600 text-md py-10">
            Failed to load resources. Please try again later.
          </div>
        )}

        {/* No Data Found */}
        {!loading && !error && resources.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <img
              src={noDataImage}
              alt="No data found"
              className="w-72 h-auto mb-6 rounded-full"
            />
          </div>
        )}

        {/* FAQ Section */}
        {!loading && !error && resources.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resources?.map((item, index) => (
              <div key={index} className="w-full">
                <FAQDropdown
                  question={item.faq_question}
                  answer={item.faq_solution}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
