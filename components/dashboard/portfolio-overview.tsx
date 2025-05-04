"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useDYTToken } from "@/hooks/use-dyt-token";

const performanceData = [
  { date: "Jan", value: 100 },
  { date: "Feb", value: 105 },
  { date: "Mar", value: 108 },
  { date: "Apr", value: 112 },
  { date: "May", value: 115 },
  { date: "Jun", value: 120 },
];

export function PortfolioOverview() {
  const { balance, stakedBalance, rewards } = useDYTToken();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${balance}</div>
            <p className="text-sm text-muted-foreground">+15.8% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staked Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stakedBalance}</div>
            <p className="text-sm text-muted-foreground">Earning 8.5% APY</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${rewards}</div>
            <p className="text-sm text-muted-foreground">Last payout: 3 days ago</p>
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
                <XAxis dataKey="date" />
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
    </div>
  );
}