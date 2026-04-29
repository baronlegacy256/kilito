"use client";

import React, { useEffect } from "react";

export default function PackageDetailLayout({ children }) {
  useEffect(() => {
    // Dynamically load the package-detail stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/styles/package-detail.css";
    link.id = "package-detail-stylesheet";
    document.head.appendChild(link);

    return () => {
      // Remove the stylesheet when unmounting
      const existingLink = document.getElementById("package-detail-stylesheet");
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };
  }, []);

  return (
    <div className="package-page">
      {children}
    </div>
  );
}

