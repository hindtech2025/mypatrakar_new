import React from "react";

export default function BlogFooter() {
  return (
    <div className="mt-24 mb-6">
      <div className="flex flex-col items-center justify-center">
        {/* Powered By */}
        <p className="mt-4 text-[16px] font-medium text-[#6B7280]">
          Proudly Powered by{" "}
          <a
            href="https://www.hindtechitsolutions.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[#111827] hover:underline hover:text-red-500 "
          >
            Hindtech It Solutions
          </a>
        </p>

        {/* Copyright */}
        <p className="mt-2 text-[15px] text-[#9CA3AF]">
          © 2026 All rights reserved.
        </p>
      </div>
    </div>
  );
}
