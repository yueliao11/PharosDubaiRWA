import { Button } from "@/components/ui/button";
import { LandingHero } from "@/components/landing/hero";
import { LandingNavbar } from "@/components/landing/navbar";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FeaturedProperties } from "@/components/landing/featured-properties";
import { Testimonials } from "@/components/landing/testimonials";
import { InvestmentBenefits } from "@/components/landing/investment-benefits";
import { LandingFooter } from "@/components/landing/footer";
import { MarketInsights } from "@/components/landing/market-insights";
import { Newsletter } from "@/components/landing/newsletter";
import { Partners } from "@/components/landing/partners";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <LandingHero />
        <HowItWorks />
        <FeaturedProperties />
        <InvestmentBenefits />
        <MarketInsights />
        <Partners />
        <Testimonials />
        <Newsletter />
      </main>
      <LandingFooter />
    </div>
  );
}