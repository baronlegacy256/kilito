"use client";

import PackageEditForm from "@/components/Admin/PackageEditForm";

export default function NewPackagePage() {
  return (
    <div style={{ padding: "16px 0" }}>
      <PackageEditForm packageId="new" />
    </div>
  );
}
