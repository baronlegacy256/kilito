import React from "react";
import "@/app/package-detail.css";
import "@/app/packages/package-page.css";

export default function PackageDetailLayout({ children }) {
  return (
    <div className="package-page">
      {children}
    </div>
  );
}
