"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview";
import { PropertyList } from "@/components/dashboard/property-list";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { useUserStore } from "@/lib/store";
import { KYCModal } from "@/components/kyc/kyc-modal";

export default function DashboardPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { kycStatus } = useUserStore();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your real estate investment portfolio
            </p>
          </div>
          {kycStatus !== "APPROVED" && <KYCModal />}
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PortfolioOverview />
          </TabsContent>

          <TabsContent value="properties">
            <PropertyList />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionHistory />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}