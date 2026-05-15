import { ArrowBigLeft } from "lucide-react";
import React from "react";
import { FaHome } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

/**import { IoIosArrowForward } from "react-icons/io";

 * BreadcrumbComponent
 * -------------------
 * A clean, accessible, responsive breadcrumb component built with Tailwind CSS.
 *
 * Props:
 *  - items: Array<{ label: string, href?: string, current?: boolean }>
 *
 * Example:
 * const items = [
 *   { label: 'Blog', href: '/' },
 *   { label: 'Awareness', href: '/awareness' },
 *   { label: 'Internet Safety Tips for Kids', current: true }
 * ];
 * <BreadcrumbComponent items={items} />
 *
 * Notes:
 *  - Items with `current: true` are rendered as non-link and marked with aria-current.
 *  - The component truncates long labels on small screens using `truncate`.
 *  - Customize separator, spacing or text sizes through Tailwind classes.
 */

export default function BreadcrumbComponent({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <nav className="w-full" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm sm:text-base">
        {/* Home icon / first crumb (optional) */}
        <li className="flex items-center">
          <a
            href="/blog-page"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800"
            aria-current={items[0]?.current ? "page" : undefined}
          >
            {/* simple house SVG (inline for zero deps) */}
            <FaHome />
            <span className="hidden sm:inline font-sans font-semibold text-gray-600">
              {items[0]?.label || "Home"}
            </span>
          </a>
        </li>

        {/* loop remaining items (skip first because used as home) */}
        {items.slice(1).map((item, idx) => {
          const isLast = idx === items.slice(1).length - 1;
          return (
            <li
              key={`${item.label}-${idx}`}
              className="flex  items-center font-sans font-semibold text-gray-600"
            >
              {/* separator */}
              <span className="mx-2  " aria-hidden>
                <IoIosArrowForward />
                {/* you can replace with chevron or svg */}
              </span>

              {item.current || isLast ? (
                <span
                  className="max-w-xs sm:max-w-md font-sans truncate text-gray-900 font-bold"
                  aria-current={item.current || isLast ? "page" : undefined}
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || "#"}
                  className="max-w-xs sm:max-w-md truncate text-gray-600 hover:text-gray-800"
                  title={item.label}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
