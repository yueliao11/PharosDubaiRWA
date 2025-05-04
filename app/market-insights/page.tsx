"use client";

import { MarketInsights } from "@/components/landing/market-insights";
import { SharedNavbar } from '@/components/shared-navbar';

export default function MarketInsightsPage() {
  return (
    <>
      <SharedNavbar />
      <main className="min-h-screen bg-background pt-20">
        <MarketInsights />
      </main>
    </>
  );
}