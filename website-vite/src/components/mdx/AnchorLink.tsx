import React from "react";
import { Link } from "@carbon/react";
import { useLocation } from "react-router-dom";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AnchorLink({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const label = typeof children === "string" ? children : "";
  const href = label ? `#${slugify(label)}` : "#";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Get the element's position
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 64; // 48px header + 16px padding

      // Scroll to the position with offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Update URL with current route path and anchor
      const fullPath = `#${location.pathname}${href}`;
      window.history.pushState(null, "", fullPath);
    }
  };

  return (
    <li className="anchor-link-item">
      <Link href={href} onClick={handleClick}>{children}</Link>
    </li>
  );
}
