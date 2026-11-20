import { Suspense } from "react";
import TourismTabs from "@/components/TourismTabs";

export default function TourismLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="h-12 border-b border-black/10" />}>
        <TourismTabs />
      </Suspense>
      {children}
    </>
  );
}
