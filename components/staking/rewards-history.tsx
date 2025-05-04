"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 模拟数据 - 在实际应用中会从API获取
const mockRewardsHistory = [
  {
    id: "1",
    date: "2023-11-15",
    amount: "12.45",
    type: "Staking Reward",
    status: "Claimed",
  },
  {
    id: "2",
    date: "2023-11-08",
    amount: "10.72",
    type: "Staking Reward",
    status: "Claimed",
  },
  {
    id: "3",
    date: "2023-11-01",
    amount: "9.83",
    type: "Staking Reward",
    status: "Claimed",
  },
  {
    id: "4",
    date: "2023-10-25",
    amount: "9.56",
    type: "Staking Reward",
    status: "Claimed",
  },
  {
    id: "5",
    date: "2023-10-18",
    amount: "8.91",
    type: "Staking Reward",
    status: "Claimed",
  },
];

// 模拟图表数据
const mockChartData = [
  { date: "Oct 1", rewards: 8.5 },
  { date: "Oct 8", rewards: 8.7 },
  { date: "Oct 15", rewards: 9.2 },
  { date: "Oct 22", rewards: 9.5 },
  { date: "Oct 29", rewards: 9.8 },
  { date: "Nov 5", rewards: 10.7 },
  { date: "Nov 12", rewards: 12.4 },
];

interface RewardsHistoryProps {
  rewardsHistory?: typeof mockRewardsHistory;
  chartData?: typeof mockChartData;
}

export function RewardsHistory({
  rewardsHistory = mockRewardsHistory,
  chartData = mockChartData,
}: RewardsHistoryProps) {
  const [activeTab, setActiveTab] = useState("history");

  // 获取总奖励
  const totalRewards = rewardsHistory.reduce(
    (total, record) => total + parseFloat(record.amount),
    0
  ).toFixed(2);

  // 计算周环比变化
  const lastWeekReward = parseFloat(rewardsHistory[0]?.amount || "0");
  const prevWeekReward = parseFloat(rewardsHistory[1]?.amount || "0");
  const weeklyChange = prevWeekReward
    ? ((lastWeekReward - prevWeekReward) / prevWeekReward) * 100
    : 0;

  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Rewards History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Rewards Earned</p>
            <p className="text-2xl font-bold">{totalRewards} DYT</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Week Reward</p>
            <p className="text-2xl font-bold">{lastWeekReward} DYT</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Weekly Change</p>
            <p
              className={`text-xl font-medium ${
                weeklyChange >= 0 ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {weeklyChange >= 0 ? "+" : ""}
              {weeklyChange.toFixed(1)}%
            </p>
          </div>
        </div>

        <Tabs defaultValue="history" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-6">
            <TabsTrigger value="history" className="flex-1">
              History
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex-1">
              Trend
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewardsHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{formatDate(record.date)}</TableCell>
                      <TableCell className="font-medium">
                        {record.amount} DYT
                      </TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell className="text-right">
                        <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                          {record.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="chart">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} DYT`, "Rewards"]}
                    contentStyle={{ 
                      background: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '6px', 
                      border: 'none', 
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' 
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rewards"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 