import React from "react";

export default function AnchorLinks({ children }: { children: React.ReactNode }) {
  return (
    <nav className="anchor-links-container" aria-label="Page sections">
      <ul className="anchor-links-list">{children}</ul>
    </nav>
  );
}
