"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useDYTToken } from "@/hooks/use-dyt-token";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Info, TrendingUp, Wallet, CoinsIcon, History, Calendar, Clock } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { KYCModal } from "@/components/kyc/kyc-modal";
import { MarketOverview } from "@/components/staking/market-overview";
import { RewardsHistory } from "@/components/staking/rewards-history";
import { StakingGuide } from "@/components/staking/staking-guide";
import { SharedNavbar } from "@/components/shared-navbar";

const rewardHistory = [
  { date: "2024-03-15", amount: 125, type: "Staking Reward" },
  { date: "2024-03-08", amount: 115, type: "Staking Reward" },
  { date: "2024-03-01", amount: 130, type: "Staking Reward" },
];

const rewardTrendData = [
  { date: "Jan", rewards: 450 },
  { date: "Feb", rewards: 520 },
  { date: "Mar", rewards: 370 },
  { date: "Apr", rewards: 600 },
  { date: "May", rewards: 450 },
  { date: "Jun", rewards: 520 },
];

const stakingData = [
  { name: "Staked", value: 65 },
  { name: "Unstaked", value: 35 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--muted))"];

export default function StakingPage() {
  const { address, isConnected } = useAccount();
  const { balance, stakedBalance, rewards, stake, unstake, claimRewards, approveTokens } = useDYTToken();
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [autoCompound, setAutoCompound] = useState(false);
  const [stakingPeriod, setStakingPeriod] = useState("30");
  const [isLoading, setIsLoading] = useState({
    stake: false,
    unstake: false,
    claim: false,
  });
  const [scheduledOperation, setScheduledOperation] = useState<{
    type: "stake" | "unstake";
    amount: string;
    date: string;
  } | null>(null);
  const { toast } = useToast();
  const { kycStatus } = useUserStore();

  const handleStake = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (kycStatus !== "APPROVED") {
      toast({
        title: "KYC Required",
        description: "Please complete KYC verification to stake tokens.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(prev => ({ ...prev, stake: true }));
      
      await approveTokens(stakeAmount);
      await stake(stakeAmount);
      toast({
        title: "Success",
        description: `Successfully staked ${stakeAmount} DYT`,
      });
      setStakeAmount("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to stake tokens",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, stake: false }));
    }
  };

  const handleUnstake = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected", 
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(prev => ({ ...prev, unstake: true }));
      await unstake(unstakeAmount);
      toast({
        title: "Success",
        description: `Successfully unstaked ${unstakeAmount} DYT`,
      });
      setUnstakeAmount("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unstake tokens",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, unstake: false }));
    }
  };

  const handleScheduleOperation = (type: "stake" | "unstake", amount: string) => {
    setScheduledOperation({
      type,
      amount,
      date: new Date().toISOString().split("T")[0],
    });
    toast({
      title: "Operation Scheduled",
      description: `${type === "stake" ? "Staking" : "Unstaking"} operation scheduled`,
    });
  };

  const totalBalance = parseFloat(balance) + parseFloat(stakedBalance);
  const stakingRatio = (parseFloat(stakedBalance) / totalBalance) * 100;
  const estimatedApy = 8.5 + (parseInt(stakingPeriod) > 90 ? 2 : 0);

  return (
    <>
      <SharedNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">DYT Staking</h1>
            <p className="text-muted-foreground">
              Earn additional rewards by staking your DYT tokens
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StakingGuide />
          </div>
          {!isConnected && (
            <Card className="p-4 bg-amber-50 dark:bg-amber-950 border-amber-300 dark:border-amber-800">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Connect your wallet to start staking
                </p>
              </div>
            </Card>
          )}
          {kycStatus !== "APPROVED" && <KYCModal />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{balance} DYT</p>
              <p className="text-sm text-muted-foreground">Available to stake</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CoinsIcon className="h-5 w-5" />
                Staked Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stakedBalance} DYT</p>
              <p className="text-sm text-muted-foreground">Currently staked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Total Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{rewards} DYT</p>
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-emerald-500">+{estimatedApy}% APY</p>
                {parseFloat(rewards) > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={async () => {
                      try {
                        await claimRewards();
                        toast({
                          title: "Success",
                          description: `Successfully claimed rewards`,
                        });
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: "Failed to claim rewards",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    Claim Rewards
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Staking Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stakingData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {stakingData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Portion']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Stake DYT</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Staking Period</Label>
                    <Select value={stakingPeriod} onValueChange={setStakingPeriod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 Days (8.5% APY)</SelectItem>
                        <SelectItem value="90">90 Days (8.5% APY)</SelectItem>
                        <SelectItem value="180">180 Days (10.5% APY)</SelectItem>
                        <SelectItem value="365">365 Days (10.5% APY)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    type="number"
                    placeholder="Amount to stake"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    disabled={!isConnected || isLoading.stake}
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleStake} 
                      className="flex-1"
                      disabled={!isConnected || isLoading.stake}
                    >
                      {isLoading.stake ? "Staking..." : "Stake Now"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleScheduleOperation("stake", stakeAmount)}
                      className="flex-1"
                      disabled={!isConnected || isLoading.stake}
                    >
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unstake DYT</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    type="number"
                    placeholder="Amount to unstake"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                    disabled={!isConnected || isLoading.unstake}
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleUnstake} 
                      className="flex-1"
                      disabled={!isConnected || isLoading.unstake}
                    >
                      {isLoading.unstake ? "Unstaking..." : "Unstake Now"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleScheduleOperation("unstake", unstakeAmount)}
                      className="flex-1"
                      disabled={!isConnected || isLoading.unstake}
                    >
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-compound Rewards</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically reinvest earned rewards
                    </p>
                  </div>
                  <Switch
                    checked={autoCompound}
                    onCheckedChange={setAutoCompound}
                  />
                </div>

                {scheduledOperation && (
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Scheduled Operation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{scheduledOperation.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {scheduledOperation.type === "stake" ? "Stake" : "Unstake"}{" "}
                          {scheduledOperation.amount} DYT
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Info className="h-4 w-4 mr-2" />
                  Reward Calculation Info
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>How Rewards Are Calculated</DialogTitle>
                  <DialogDescription>
                    <div className="space-y-4 mt-4">
                      <p>
                        Base APY: 8.5%
                        <br />
                        Long-term Bonus: +2% (180+ days)
                        <br />
                        Auto-compound Bonus: +0.5%
                      </p>
                      <p>
                        Rewards are calculated daily and distributed monthly. The actual APY
                        may vary based on market conditions and platform performance.
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-6">
          <MarketOverview />
          
          <div className="grid grid-cols-1 gap-6">
            <RewardsHistory />
          </div>
        </div>
      </div>
    </>
  );
}