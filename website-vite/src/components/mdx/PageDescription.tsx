import React from "react";

export default function PageDescription({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-description">
      {children}
    </div>
  );
}
