import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/requireAdmin";

export default async function AdminIndexPage() {
  const session = await requireAdminSession();
  if (session) {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login");
  }
}
