"use client";

import { useParams } from "next/navigation";
import PackageEditForm from "@/components/Admin/PackageEditForm";

export default function EditPackagePage() {
  const params = useParams();
  const id = params.id;

  return (
    <div style={{ padding: "16px 0" }}>
      <PackageEditForm packageId={id} />
    </div>
  );
}
