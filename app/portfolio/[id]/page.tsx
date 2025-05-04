"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { AssetActions } from '@/components/portfolio/asset-actions';
import { useToast } from '@/hooks/use-toast';
import { useUserStore } from '@/lib/store';
import { Calendar, MapPin, TrendingUp, Clock, Users, Building } from 'lucide-react';
import { SharedNavbar } from '@/components/shared-navbar';

// 模拟资产数据
const mockAssets = [
  {
    id: 'asset-1',
    name: 'Palm Jumeirah Villa',
    location: 'Dubai, UAE',
    description: 'Luxury waterfront villa on Palm Jumeirah with direct beach access and panoramic views of the Dubai Marina skyline.',
    tokens: 1250,
    totalTokens: 5000,
    investmentAmount: 25000,
    propertyValue: 2500000,
    acquisitionDate: new Date('2023-12-15'),
    maturityDate: new Date('2025-12-15'),
    rentalYield: 8.2,
    isLocked: false,
    assetType: 'Residential',
    squareFootage: 5200,
    bedrooms: 5,
    bathrooms: 6,
    occupancy: 95
  },
  {
    id: 'asset-2',
    name: 'Downtown Dubai Apartment',
    location: 'Dubai, UAE',
    description: 'Modern apartment in Downtown Dubai with stunning views of Burj Khalifa, walking distance to Dubai Mall and major attractions.',
    tokens: 750,
    totalTokens: 3000,
    investmentAmount: 15000,
    propertyValue: 1200000,
    acquisitionDate: new Date('2024-01-10'),
    maturityDate: new Date('2026-01-10'),
    rentalYield: 7.5,
    isLocked: false,
    assetType: 'Residential',
    squareFootage: 1800,
    bedrooms: 2,
    bathrooms: 2.5,
    occupancy: 92
  },
  {
    id: 'asset-3',
    name: 'Business Bay Office',
    location: 'Dubai, UAE',
    description: 'Prime office space in Business Bay district with modern amenities, meeting rooms, and close proximity to major business hubs.',
    tokens: 2000,
    totalTokens: 8000,
    investmentAmount: 40000,
    propertyValue: 3200000,
    acquisitionDate: new Date('2023-10-05'),
    maturityDate: new Date('2024-06-01'),
    rentalYield: 9.0,
    isLocked: false,
    assetType: 'Commercial',
    squareFootage: 3500,
    bedrooms: 0,
    bathrooms: 2,
    occupancy: 88
  }
];

// 模拟收益历史数据
const revenueHistory = [
  { month: 'Jan', revenue: 1700 },
  { month: 'Feb', revenue: 1700 },
  { month: 'Mar', revenue: 1800 },
  { month: 'Apr', revenue: 1750 },
  { month: 'May', revenue: 1900 },
  { month: 'Jun', revenue: 2000 },
];

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { isConnected } = useAccount();
  const { portfolio } = useUserStore();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  const assetId = params.id as string;
  
  // 从 Portfolio 或模拟数据中获取资产信息
  useEffect(() => {
    if (!isConnected) {
      router.push('/');
      return;
    }
    
    setLoading(true);
    
    // 尝试从 portfolio 中查找资产
    const foundAsset = portfolio.find(a => a.id === assetId) || 
                       mockAssets.find(a => a.id === assetId);
                       
    if (foundAsset) {
      setAsset(foundAsset);
    } else {
      toast({
        title: "Asset Not Found",
        description: "The requested asset could not be found in your portfolio.",
        variant: "destructive",
      });
      router.push('/portfolio');
    }
    
    setLoading(false);
  }, [assetId, isConnected, portfolio, router, toast]);
  
  if (loading || !asset) {
    return (
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-muted-foreground">Loading asset details...</p>
        </div>
      </div>
    );
  }
  
  // 判断是否已到期
  const isMatured = asset.maturityDate instanceof Date && 
                    !isNaN(asset.maturityDate.getTime()) && 
                    new Date() >= asset.maturityDate;
  
  // 计算月收入
  const monthlyIncome = (asset.investmentAmount * (asset.rentalYield / 100) / 12).toFixed(2);
  
  // 计算所有权百分比
  const ownershipPercentage = ((asset.tokens / asset.totalTokens) * 100).toFixed(2);
  
  return (
    <>
      <SharedNavbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-serif font-bold">{asset.name}</h1>
                {isMatured ? (
                  <Badge variant="default" className="bg-emerald-500">Matured</Badge>
                ) : (
                  <Badge variant="outline">Active</Badge>
                )}
              </div>
              <div className="flex items-center text-muted-foreground mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{asset.location}</span>
              </div>
              <p className="text-muted-foreground max-w-2xl">
                {asset.description}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <AssetActions 
                assetId={asset.id} 
                maturityDate={asset.maturityDate}
                isLocked={asset.isLocked}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${asset.investmentAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{ownershipPercentage}% ownership</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{asset.tokens.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">of {asset.totalTokens.toLocaleString()} total</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Rental Yield</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">{asset.rentalYield}%</div>
                <p className="text-xs text-muted-foreground">${monthlyIncome}/month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Maturity Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {asset.maturityDate instanceof Date && !isNaN(asset.maturityDate.getTime())
                    ? format(asset.maturityDate, 'MMM d, yyyy')
                    : 'Invalid date'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {isMatured ? "Redemption available" : "Until redemption"}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Revenue History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={revenueHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="revenue" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-muted-foreground">
                        <Building className="w-4 h-4 mr-2" />
                        <span>Type</span>
                      </div>
                      <span className="font-medium">{asset.assetType}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Acquisition Date</span>
                      </div>
                      <span className="font-medium">
                        {asset.acquisitionDate instanceof Date && !isNaN(asset.acquisitionDate.getTime())
                          ? format(asset.acquisitionDate, 'MMM d, yyyy')
                          : 'Invalid date'}
                      </span>
                    </div>
                    
                    {asset.bedrooms > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-muted-foreground">
                          <span className="mr-2">🛏️</span>
                          <span>Bedrooms</span>
                        </div>
                        <span className="font-medium">{asset.bedrooms}</span>
                      </div>
                    )}
                    
                    {asset.bathrooms > 0 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-muted-foreground">
                          <span className="mr-2">🚿</span>
                          <span>Bathrooms</span>
                        </div>
                        <span className="font-medium">{asset.bathrooms}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-muted-foreground">
                        <span className="mr-2">📏</span>
                        <span>Size</span>
                      </div>
                      <span className="font-medium">{asset.squareFootage} sq ft</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Occupancy</span>
                      </div>
                      <span className="font-medium">{asset.occupancy}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-muted-foreground">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        <span>Property Value</span>
                      </div>
                      <span className="font-medium">${asset.propertyValue.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="financials">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                  <CardDescription>
                    Detailed breakdown of your investment performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Investment Details</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Investment Amount</span>
                          <span className="font-medium">${asset.investmentAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Token Price at Purchase</span>
                          <span className="font-medium">${(asset.investmentAmount / asset.tokens).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tokens Owned</span>
                          <span className="font-medium">{asset.tokens.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ownership Percentage</span>
                          <span className="font-medium">{ownershipPercentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Acquisition Date</span>
                          <span className="font-medium">{format(asset.acquisitionDate, 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Return Metrics</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Annual Rental Yield</span>
                          <span className="font-medium text-emerald-600">{asset.rentalYield}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly Income</span>
                          <span className="font-medium">${monthlyIncome}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Maturity Date</span>
                          <span className="font-medium">{format(asset.maturityDate, 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Days Until Maturity</span>
                          <span className="font-medium">
                            {isMatured ? 
                              "Matured" : 
                              Math.ceil((asset.maturityDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estimated ROI at Maturity</span>
                          <span className="font-medium text-emerald-600">
                            {(asset.rentalYield * Math.ceil((asset.maturityDate - asset.acquisitionDate) / (1000 * 60 * 60 * 24 * 365)) + 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Legal Documents</CardTitle>
                  <CardDescription>
                    Access all legal documents related to your investment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="p-4 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Purchase Agreement</h4>
                          <p className="text-sm text-muted-foreground">Legal agreement for token purchase</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </li>
                    <li className="p-4 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Property Deed</h4>
                          <p className="text-sm text-muted-foreground">Certified property ownership record</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </li>
                    <li className="p-4 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Tokenization Agreement</h4>
                          <p className="text-sm text-muted-foreground">Terms of the property tokenization</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </li>
                    <li className="p-4 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Tax Documents</h4>
                          <p className="text-sm text-muted-foreground">Tax-related documents for your investment</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
} 