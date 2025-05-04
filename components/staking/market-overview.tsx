"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface MarketOverviewProps {
  // 在实际项目中，这些数据应该从API获取
  totalStaked?: string; // 总质押量
  stakingRatio?: number; // 市场质押率
  weeklyChange?: number; // 周环比变化
  distributionData?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function MarketOverview({
  totalStaked = "1,250,000",
  stakingRatio = 32.5,
  weeklyChange = 5.2,
  distributionData = [
    { name: "Marina Heights", value: 35, color: "#3b82f6" },
    { name: "Palm Jumeirah", value: 25, color: "#10b981" },
    { name: "Downtown Dubai", value: 20, color: "#f59e0b" },
    { name: "Business Bay", value: 15, color: "#8b5cf6" },
    { name: "Other Properties", value: 5, color: "#6b7280" },
  ]
}: MarketOverviewProps) {
  
  const isPositiveChange = weeklyChange >= 0;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Market Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total DYT Staked</p>
            <p className="text-3xl font-bold">{totalStaked} DYT</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Market Staking Ratio</p>
            <p className="text-2xl font-semibold">{stakingRatio}%</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Weekly Change</p>
            <div className="flex items-center">
              <p className={`text-xl font-medium ${isPositiveChange ? 'text-emerald-500' : 'text-red-500'}`}>
                {isPositiveChange ? '+' : ''}{weeklyChange}%
              </p>
              <span className={`ml-2 ${isPositiveChange ? 'text-emerald-500' : 'text-red-500'}`}>
                {isPositiveChange ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
              </span>
            </div>
          </div>
        </div>
        
        <div className="h-[200px]">
          <p className="text-sm text-muted-foreground mb-2">Staking Distribution</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: 'none', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 