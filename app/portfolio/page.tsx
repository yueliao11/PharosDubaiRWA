"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/lib/store';
import { AssetActions } from '@/components/portfolio/asset-actions';
import { SharedNavbar } from '@/components/shared-navbar';

// 模拟数据
const performanceData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 105 },
  { month: 'Mar', value: 110 },
  { month: 'Apr', value: 108 },
  { month: 'May', value: 115 },
  { month: 'Jun', value: 120 },
];

const allocationData = [
  { name: 'Residential', value: 60 },
  { name: 'Commercial', value: 25 },
  { name: 'Retail', value: 15 },
];

// 模拟资产数据
const mockAssets = [
  {
    id: 'asset-1',
    name: 'Palm Jumeirah Villa',
    location: 'Dubai, UAE',
    tokens: 1250,
    investmentAmount: 25000,
    acquisitionDate: new Date('2023-12-15'),
    maturityDate: new Date('2025-12-15'),
    rentalYield: 8.2,
    isLocked: false
  },
  {
    id: 'asset-2',
    name: 'Downtown Dubai Apartment',
    location: 'Dubai, UAE',
    tokens: 750,
    investmentAmount: 15000,
    acquisitionDate: new Date('2024-01-10'),
    maturityDate: new Date('2026-01-10'),
    rentalYield: 7.5,
    isLocked: false
  },
  {
    id: 'asset-3',
    name: 'Business Bay Office',
    location: 'Dubai, UAE',
    tokens: 2000,
    investmentAmount: 40000,
    acquisitionDate: new Date('2023-10-05'),
    maturityDate: new Date('2024-06-01'), // 已到期的示例
    rentalYield: 9.0,
    isLocked: false
  }
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export default function PortfolioPage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('overview');
  const { portfolio } = useUserStore();

  const assets = portfolio.length > 0 ? portfolio : mockAssets;

  // 计算总资产价值
  const totalValue = assets.reduce((sum, asset) => sum + asset.investmentAmount, 0);
  
  // 计算月收入 (基于租金收益率)
  const monthlyIncome = assets.reduce((sum, asset) => {
    return sum + (asset.investmentAmount * (asset.rentalYield / 100) / 12);
  }, 0);
  
  // 计算平均收益率
  const averageYield = assets.length > 0 
    ? assets.reduce((sum, asset) => sum + asset.rentalYield, 0) / assets.length
    : 0;

  if (!isConnected) {
    router.push('/');
    return null;
  }

  return (
    <>
      <SharedNavbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2">Portfolio</h1>
            <p className="text-muted-foreground">
              Track your investment performance and asset allocation
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assets">My Assets</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="allocation">Allocation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                    <p className="text-sm text-emerald-500">+15.8% this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Total Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{assets.length}</div>
                    <p className="text-sm text-muted-foreground">Across {new Set(assets.map(a => a.location)).size} locations</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Income</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${monthlyIncome.toFixed(2)}</div>
                    <p className="text-sm text-muted-foreground">{averageYield.toFixed(1)}% yield</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="assets">
              <Card>
                <CardHeader>
                  <CardTitle>My Asset Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Asset</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Tokens</TableHead>
                        <TableHead>Investment</TableHead>
                        <TableHead>Acquisition Date</TableHead>
                        <TableHead>Maturity Date</TableHead>
                        <TableHead>Yield</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assets.map((asset) => (
                        <TableRow key={asset.id}>
                          <TableCell className="font-medium">{asset.name}</TableCell>
                          <TableCell>{asset.location}</TableCell>
                          <TableCell>{asset.tokens.toLocaleString()}</TableCell>
                          <TableCell>${asset.investmentAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            {asset.acquisitionDate instanceof Date && !isNaN(asset.acquisitionDate.getTime())
                              ? format(asset.acquisitionDate, 'yyyy-MM-dd')
                              : 'Invalid date'}
                          </TableCell>
                          <TableCell>
                            {asset.maturityDate instanceof Date && !isNaN(asset.maturityDate.getTime())
                              ? format(asset.maturityDate, 'yyyy-MM-dd')
                              : 'Invalid date'}
                          </TableCell>
                          <TableCell className="text-emerald-600">{asset.rentalYield}%</TableCell>
                          <TableCell>
                            {asset.maturityDate instanceof Date && !isNaN(asset.maturityDate.getTime()) && new Date() >= asset.maturityDate ? (
                              <Badge variant="default" className="bg-emerald-500">Matured</Badge>
                            ) : (
                              <Badge variant="outline">Active</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <AssetActions 
                              assetId={asset.id} 
                              maturityDate={asset.maturityDate}
                              isLocked={asset.isLocked}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Historical Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="allocation">
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={allocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}