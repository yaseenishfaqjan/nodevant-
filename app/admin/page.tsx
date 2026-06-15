import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";

// Private internal tool — must never be indexed (this is the one legitimate
// exception to the public-pages "no noindex" rule).
export const metadata: Metadata = {
  title: "Nodevant CRM",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
