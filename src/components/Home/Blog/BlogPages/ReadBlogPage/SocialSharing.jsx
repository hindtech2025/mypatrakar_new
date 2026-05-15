import { FaTwitter, FaFacebook } from "react-icons/fa";
import React from "react";

export default function SocialSharing() {
  const style = {
    fontFamily: 'Times New Roman',
  };

  return (
    <div className="max-w-xl  my-8">
      {/* Divider */}
      <hr className="w-16  border-t border-gray-300 mb-4" />
      
      {/* Share Text */}
      <h3 className="text-gray-700 mb-4 text-start text-xs" style={style}>
        Share this:
      </h3>

      {/* Social Buttons */}
      <div className="flex justify-start gap-4">
        {/* Twitter Button */}
        <a
          href="https://blog.Myptrakar.com/2023/04/30/top-features-to-include-in-your-ecommerce-app/?share=twitter&amp;nb=1"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2 px-4 rounded-md border-2 border-red-500 hover:border-red-700 transition duration-300 hover:no-underline focus:no-underline"
          title="Click to share on Twitter"
        >
          <FaTwitter className="text-2xl text-red-500" />
          <p className="font-medium text-red-500" style={style}>Twitter</p>
        </a>

        {/* Facebook Button */}
        <a
          href="https://blog.Myptrakar.com/2023/04/30/top-features-to-include-in-your-ecommerce-app/?share=facebook&amp;nb=1"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2 px-4 rounded-md border-2 border-red-700 hover:border-red-900 transition duration-300 hover:no-underline focus:no-underline"
          title="Click to share on Facebook"
        >
          <FaFacebook className="text-2xl text-red-700" />
          <p className="font-medium text-red-700" style={style}>Facebook</p>
        </a>
      </div>
    </div>
  );
}
