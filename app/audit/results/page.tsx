import type { Metadata } from "next";
import AuditResultsView from "@/components/audit/AuditResultsView";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Your Automation Audit Results — Nodevant",
  description:
    "Your personalized automation report: automation score, #1 opportunity, estimated ROI, and recommended solution.",
  path: "/audit/results/",
});

export default function AuditResultsPage() {
  return <AuditResultsView />;
}
