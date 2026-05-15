import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

// -------- TEXT TRUNCATION FUNCTION ----------
const truncateHTMLText = (html, limit) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const fullText = tempDiv.innerText.trim();

  if (fullText.length <= limit) return html;

  const truncatedText = fullText.slice(0, limit) + "...";

  return truncatedText;
};

// ----------- JSX CONVERTER (BLOG STYLED) -------------------------
const convertNodeToJSX = (node, id) => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  const tag = node.tagName?.toLowerCase();
  const children = Array.from(node.childNodes).map((child) =>
    convertNodeToJSX(child, id)
  );

  const styles = {
    h1: "text-[32px] md:text-[40px] font-bold text-gray-900 mb-6 leading-tight",
    h2: "text-[26px] md:text-[32px] font-semibold text-gray-800 mt-10 mb-4 leading-snug",
    h3: "text-[22px] md:text-[26px] font-semibold text-gray-700 mt-8 mb-3 leading-snug",
    p: "text-[17px] text-gray-700 leading-[1.9] font-sans tracking-wide mb-5",
    li: "text-[16px] text-gray-700 leading-[1.8] mb-2 pl-1",
    a: "text-blue-700 underline decoration-[1.5px] underline-offset-4 hover:text-blue-900 transition duration-200 inline-flex items-center gap-1",
    img: "w-full rounded-2xl shadow-lg my-8 border border-gray-200",
  };

  switch (tag) {
    case "div":
      return <div className="my-4">{children}</div>;
    case "h1":
      return <h1 className={styles.h1}>{children}</h1>;
    case "h2":
      return <h2 className={styles.h2}>{children}</h2>;
    case "h3":
      return <h3 className={styles.h3}>{children}</h3>;
    case "p":
      return <p className={styles.p}>{children}</p>;
    case "ul":
      return <ul className="list-disc pl-6 my-4">{children}</ul>;
    case "li":
      return (
        <li key={Math.random() * 10 + id} className={styles.li}>
          {children}
        </li>
      );
    case "a":
      return (
        <a
          className={styles.a}
          href={node.getAttribute("href")}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          {children} <FaExternalLinkAlt className="text-[13px]" />
        </a>
      );
    case "img":
      return (
        <img
          className={styles.img}
          src={node.getAttribute("src")}
          alt={node.getAttribute("alt") || ""}
        />
      );
    default:
      return <span>{children}</span>;
  }
};

// ----------- MAIN COMPONENT -------------------------
export default function HtmlToPlainText({ htmlContent, id, contentLength }) {
  const finalHTML =
    contentLength && Number(contentLength) > 0
      ? truncateHTMLText(htmlContent, contentLength)
      : htmlContent;

  const parser = new DOMParser();
  const doc = parser.parseFromString(finalHTML, "text/html");
  const body = doc.body;

  const elements = Array.from(body.childNodes).map((node) =>
    convertNodeToJSX(node, id)
  );

  return (
    <div className="max-w-3xl mx-auto py-3">
      <article className="prose prose-lg prose-gray max-w-none">
        {elements}
      </article>
    </div>
  );
}
