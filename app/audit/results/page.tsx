import type { Metadata } from "next";
import AuditResultsView from "@/components/audit/AuditResultsView";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Your Automation Audit Results — Nodevant",
  description:
    "Your personalized automation report: automation score, #1 opportunity, estimated ROI, and recommended solution.",
  path: "/audit/results/",
  // The report is assembled in the browser from the visitor's own answers,
  // so the HTML a crawler receives is an empty shell - which is exactly why
  // Bing reported this page, and only this page, as having no h1. There is
  // nothing to server-render here that would be true for anyone else.
  noindex: true,
});

export default function AuditResultsPage() {
  return <AuditResultsView />;
}
