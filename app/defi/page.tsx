"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvestModal } from "@/components/properties/invest-modal";
import { useUserStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { SharedNavbar } from "@/components/shared-navbar";
import { 
  CoinIcon, CoinsIcon, ArrowUpRight, Clock, DollarSign, LineChart, 
  ArrowDownRight, Calendar, ShieldCheck, CircleDollarSign, Wallet, TrendingUp 
} from "lucide-react";

// Sample data - in a real app would come from contracts/APIs
const mockAssets = [
  {
    id: "asset-1",
    name: "Palm Jumeirah Villa",
    symbol: "PJV",
    balance: 500,
    totalSupply: 10000,
    price: 100,  // $100 per token
    maturityDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 1 year from now
    currentDiscount: 15, // 15% discount if cashing out early
    redeemRate: 105, // 105% at maturity (5% bonus on top of principal)
    tokenAddress: "0x1234...5678",
    apy: 7.5, // Annual yield when staked
  },
  {
    id: "asset-2",
    name: "Downtown Dubai Apartment",
    symbol: "DDA",
    balance: 750,
    totalSupply: 5000,
    price: 120,
    maturityDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 2 years from now
    currentDiscount: 20,
    redeemRate: 110,
    tokenAddress: "0x8765...4321",
    apy: 8.2,
  }
];

export default function DeFiPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { kycStatus } = useUserStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  
  // Helper functions
  const checkUserRequirements = () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to access DeFi features",
        variant: "destructive",
      });
      return false;
    }
    
    if (kycStatus !== 'APPROVED') {
      toast({
        title: "KYC required",
        description: "Please complete KYC verification to use DeFi features",
        variant: "destructive",
      });
      router.push('/register');
      return false;
    }
    
    return true;
  };
  
  // Handle buy tokens click
  const handleBuyClick = (asset) => {
    if (!checkUserRequirements()) return;
    
    setSelectedAsset({
      id: asset.id,
      title: asset.name,
      location: "Dubai, UAE", // Placeholder
      price: asset.price * asset.totalSupply,
      rentalYield: asset.apy,
      fundingProgress: 65, // Placeholder
      financials: {
        tokenPrice: asset.price,
        minInvestment: asset.price * 10, // Minimum 10 tokens
        expectedROI: asset.apy + (asset.redeemRate - 100)
      },
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg" // Placeholder
    });
    
    setIsInvestModalOpen(true);
  };
  
  // Handle stake click
  const handleStakeClick = (asset) => {
    if (!checkUserRequirements()) return;
    router.push(`/portfolio/${asset.id}/staking?tab=stake`);
  };
  
  // Handle cashout click
  const handleCashoutClick = (asset) => {
    if (!checkUserRequirements()) return;
    router.push(`/portfolio/${asset.id}/staking?tab=cashout`);
  };
  
  // Handle redeem click
  const handleRedeemClick = (asset) => {
    if (!checkUserRequirements()) return;
    router.push(`/portfolio/${asset.id}/staking?tab=redeem`);
  };

  return (
    <>
      <SharedNavbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2">DeFi RWA Platform</h1>
            <p className="text-muted-foreground max-w-3xl">
              Access the full suite of RWA tokenization features, from buying property tokens to staking
              for yield, early cash out options, and maturity redemption.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assets">Available Assets</TabsTrigger>
              <TabsTrigger value="my-portfolio">My Portfolio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-primary" />
                      Buy RWA Tokens
                    </CardTitle>
                    <CardDescription>
                      Invest in premium Dubai real estate properties through our tokenized RWA platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Purchase fractional ownership in premium Dubai properties with as little as $1,000.
                      Each token represents a share of the underlying real estate asset.
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span>Regulatory compliant investment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CircleDollarSign className="h-4 w-4 text-primary" />
                        <span>Passive rental income through staking</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span>Potential property value appreciation</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => router.push('/properties')} className="w-full">
                      Browse Properties
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CoinsIcon className="h-5 w-5 text-primary" />
                      Stake for Yield
                    </CardTitle>
                    <CardDescription>
                      Earn passive rental income by staking your RWA tokens
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Stake your RWA tokens to earn regular yield payments generated from rental
                      income of the underlying properties. Earn up to 10% APY on your staked tokens.
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Regular yield distributions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Flexible staking periods</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span>Compounding yield option</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => router.push('/staking')} className="w-full">
                      Go to Staking
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowDownRight className="h-5 w-5 text-primary" />
                      Early Cash Out
                    </CardTitle>
                    <CardDescription>
                      Need liquidity? Cash out your tokens before maturity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Our platform allows you to cash out your tokens before maturity at a
                      discounted rate. The discount varies based on time to maturity and market conditions.
                    </p>
                    <div className="bg-muted p-4 rounded-md mb-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> Early cash out is subject to a discount from the token's face value.
                        Consider holding until maturity for maximum returns.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => router.push('/portfolio')} 
                      variant="outline" 
                      className="w-full"
                    >
                      View My Portfolio
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Maturity Redemption
                    </CardTitle>
                    <CardDescription>
                      Redeem your tokens at maturity for full value plus gains
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      When your RWA tokens reach maturity, you can redeem them at the current
                      redemption rate, which includes your principal plus any property value appreciation.
                    </p>
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-md mb-4">
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        <strong>Redemption Rate:</strong> At maturity, redemption rates can exceed 100%
                        of the token's initial value if the property has appreciated.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => router.push('/portfolio')}
                      variant="outline"
                      className="w-full"
                    >
                      View My Portfolio
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="assets">
              <Card>
                <CardHeader>
                  <CardTitle>Available RWA Assets</CardTitle>
                  <CardDescription>
                    Explore available tokenized real estate assets and their properties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Token Price</TableHead>
                        <TableHead>APY</TableHead>
                        <TableHead>Maturity</TableHead>
                        <TableHead>Redemption Rate</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAssets.map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>{asset.symbol}</TableCell>
                          <TableCell>${asset.price}</TableCell>
                          <TableCell className="text-emerald-600">{asset.apy}%</TableCell>
                          <TableCell>{asset.maturityDate}</TableCell>
                          <TableCell>{asset.redeemRate}%</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                onClick={() => handleBuyClick(asset)} 
                                variant="default" 
                                size="sm"
                              >
                                Buy
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="my-portfolio">
              <Card>
                <CardHeader>
                  <CardTitle>My RWA Portfolio</CardTitle>
                  <CardDescription>
                    Manage your tokenized real estate assets and perform actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!isConnected ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Connect your wallet to view your portfolio
                      </p>
                      <Button onClick={() => {}}>Connect Wallet</Button>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Asset</TableHead>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Balance</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Maturity</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockAssets.map((asset) => (
                          <TableRow key={asset.id}>
                            <TableCell className="font-medium">{asset.name}</TableCell>
                            <TableCell>{asset.symbol}</TableCell>
                            <TableCell>{asset.balance}</TableCell>
                            <TableCell>${(asset.balance * asset.price).toLocaleString()}</TableCell>
                            <TableCell>{asset.maturityDate}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-2">
                                <Button 
                                  onClick={() => handleStakeClick(asset)} 
                                  variant="outline" 
                                  size="sm"
                                >
                                  Stake
                                </Button>
                                <Button 
                                  onClick={() => handleCashoutClick(asset)} 
                                  variant="outline" 
                                  size="sm"
                                >
                                  Cash Out
                                </Button>
                                <Button 
                                  onClick={() => handleRedeemClick(asset)} 
                                  variant="outline" 
                                  size="sm"
                                  disabled={new Date() < new Date(asset.maturityDate)}
                                >
                                  Redeem
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Investment Modal */}
        {selectedAsset && (
          <InvestModal 
            isOpen={isInvestModalOpen} 
            onClose={() => setIsInvestModalOpen(false)} 
            property={selectedAsset}
          />
        )}
      </main>
    </>
  );
} 