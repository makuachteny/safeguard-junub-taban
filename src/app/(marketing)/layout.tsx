import type { Metadata } from "next";
import "./marketing.css";

export const metadata: Metadata = {
  title: "Taban — Digital Health Platform for South Sudan",
  description:
    "The complete hospital information system built for South Sudan. Offline-first EHR, billing, pharmacy, lab, telehealth — designed by doctors, built for real clinical workflows.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mk-page">
      {children}
    </div>
  );
}
