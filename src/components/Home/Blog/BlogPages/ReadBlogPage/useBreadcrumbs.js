import { useLocation } from "react-router-dom";

export default function useBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  // Convert slug to readable text
  const format = (str) =>
    str
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const items = [];

  // Home crumb
  items.push({ label: "Blog", href: "/blog" });

  // Loop through remaining URL segments
  pathnames.slice(1).forEach((value, index) => {
    const isLast = index === pathnames.slice(1).length - 1;
    const href = "/" + pathnames.slice(0, index + 2).join("/");

    items.push({
      label: format(value),
      href: isLast ? undefined : href,
      current: isLast,
    });
  });

  return items;
}
