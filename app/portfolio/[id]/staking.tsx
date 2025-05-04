"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import { useRwaToken } from "@/hooks/use-rwa-token";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Info, TrendingUp, Wallet, CoinsIcon, History, Calendar, Clock, AlertCircle } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { KYCModal } from "@/components/kyc/kyc-modal";
import { SharedNavbar } from '@/components/shared-navbar';

// 模拟收益历史数据
const rewardHistory = [
  { date: "2024-03-15", amount: 125, type: "RWA Yield" },
  { date: "2024-03-08", amount: 115, type: "RWA Yield" },
  { date: "2024-03-01", amount: 130, type: "RWA Yield" },
];

// 模拟收益趋势数据
const rewardTrendData = [
  { date: "Jan", rewards: 450 },
  { date: "Feb", rewards: 520 },
  { date: "Mar", rewards: 370 },
  { date: "Apr", rewards: 600 },
  { date: "May", rewards: 450 },
  { date: "Jun", rewards: 520 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--muted))"];

export default function AssetStakingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const assetId = params.id as string;
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const { kycStatus } = useUserStore();
  
  const { 
    balance, 
    stakedBalance, 
    rewards, 
    maturityDate, 
    currentDiscount, 
    redeemRate,
    isMatured,
    stakeTokens, 
    unstakeTokens, 
    claimYield, 
    earlyCashOut,
    redeem,
    approveTokens 
  } = useRwaToken(assetId);
  
  // 获取初始活动标签，从查询参数中提取
  const tabParam = searchParams.get('tab');
  const validTabs = ['stake', 'unstake', 'cashout', 'redeem'];
  const [activeTab, setActiveTab] = useState(
    validTabs.includes(tabParam) ? tabParam : 'stake'
  );
  
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [cashOutAmount, setCashOutAmount] = useState("");
  const [redeemAmount, setRedeemAmount] = useState("");
  const [isLoading, setIsLoading] = useState({
    stake: false,
    unstake: false,
    claim: false,
    cashOut: false,
    redeem: false,
  });
  
  // 显示到期日期
  const formatMaturityDate = () => {
    if (!maturityDate) return "Not set";
    return (maturityDate instanceof Date && !isNaN(maturityDate.getTime())) 
      ? maturityDate.toLocaleDateString() 
      : "Invalid date";
  };
  
  // 处理质押
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
      await stakeTokens(stakeAmount);
      toast({
        title: "Success",
        description: `Successfully staked ${stakeAmount} RWA tokens`,
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

  // 处理取消质押
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
      await unstakeTokens(unstakeAmount);
      toast({
        title: "Success",
        description: `Successfully unstaked ${unstakeAmount} RWA tokens`,
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
  
  // 处理提前套现
  const handleCashOut = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected", 
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(prev => ({ ...prev, cashOut: true }));
      const result = await earlyCashOut(cashOutAmount);
      toast({
        title: "Success",
        description: `Successfully cashed out ${cashOutAmount} RWA tokens for ${result} stablecoins`,
      });
      setCashOutAmount("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cash out tokens",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, cashOut: false }));
    }
  };
  
  // 处理到期兑换
  const handleRedeem = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected", 
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    if (!isMatured) {
      toast({
        title: "Not Matured",
        description: "This asset has not reached its maturity date yet",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(prev => ({ ...prev, redeem: true }));
      const result = await redeem(redeemAmount);
      toast({
        title: "Success",
        description: `Successfully redeemed ${redeemAmount} RWA tokens for ${result} stablecoins`,
      });
      setRedeemAmount("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to redeem tokens",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, redeem: false }));
    }
  };
  
  // 处理领取收益
  const handleClaimYield = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected", 
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(prev => ({ ...prev, claim: true }));
      await claimYield();
      toast({
        title: "Success",
        description: `Successfully claimed ${rewards} yield tokens`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim yield",
        variant: "destructive",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, claim: false }));
    }
  };
  
  // 计算提前套现的实际金额
  const calculateCashOutAmount = (amount: string) => {
    if (!amount) return "0";
    const value = parseFloat(amount);
    const discountedAmount = value * (1 - currentDiscount / 100);
    return discountedAmount.toFixed(2);
  };
  
  // 计算到期兑换的实际金额
  const calculateRedeemAmount = (amount: string) => {
    if (!amount) return "0";
    const value = parseFloat(amount);
    const redeemedAmount = value * (redeemRate / 100);
    return redeemedAmount.toFixed(2);
  };

  // 计算质押比例和其他展示数据
  const totalBalance = parseFloat(balance) + parseFloat(stakedBalance);
  const stakingRatio = totalBalance > 0 ? (parseFloat(stakedBalance) / totalBalance) * 100 : 0;
  const stakingData = [
    { name: "Staked", value: stakingRatio },
    { name: "Unstaked", value: 100 - stakingRatio },
  ];
  // 假设年化收益率为8%
  const estimatedApy = 8;

  return (
    <>
      <SharedNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">RWA Token Staking</h1>
            <p className="text-muted-foreground">
              Earn yield by staking your RWA tokens for this asset
            </p>
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
              <p className="text-2xl font-bold">{balance} RWA</p>
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
              <p className="text-2xl font-bold">{stakedBalance} RWA</p>
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
              <p className="text-2xl font-bold">{rewards} Yield</p>
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-emerald-500">+{estimatedApy}% APY</p>
                {parseFloat(rewards) > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleClaimYield}
                    disabled={isLoading.claim || parseFloat(rewards) <= 0}
                  >
                    {isLoading.claim ? "Claiming..." : "Claim Rewards"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* 展示到期信息的卡片 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Asset Maturity Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Maturity Date</p>
                <p className="text-lg font-bold">{formatMaturityDate()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Early Cash Out Discount</p>
                <p className="text-lg font-bold">{currentDiscount}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Redemption Rate</p>
                <p className="text-lg font-bold">{redeemRate}%</p>
                {isMatured && (
                  <p className="text-xs text-emerald-500">Asset has matured, redemption available</p>
                )}
                {!isMatured && (
                  <p className="text-xs text-amber-500">Not yet matured</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="stake" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="stake">Stake</TabsTrigger>
            <TabsTrigger value="unstake">Unstake</TabsTrigger>
            <TabsTrigger value="cashout">Cash Out</TabsTrigger>
            <TabsTrigger value="redeem">Redeem</TabsTrigger>
          </TabsList>
          
          {/* 质押选项卡 */}
          <TabsContent value="stake">
            <Card>
              <CardHeader>
                <CardTitle>Stake Your RWA Tokens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stake-amount">Amount to Stake</Label>
                  <div className="flex gap-2">
                    <Input
                      id="stake-amount"
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      min="0"
                      max={balance}
                      placeholder="0.0"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setStakeAmount(balance)}
                    >
                      Max
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Available Balance: {balance} RWA
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Estimated APY</span>
                    <span className="text-sm font-medium text-emerald-500">
                      {estimatedApy}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rewards Distribution</span>
                    <span className="text-sm">Daily</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handleStake}
                  disabled={isLoading.stake || !stakeAmount || parseFloat(stakeAmount) <= 0 || parseFloat(stakeAmount) > parseFloat(balance)}
                >
                  {isLoading.stake ? "Staking..." : "Stake RWA Tokens"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 取消质押选项卡 */}
          <TabsContent value="unstake">
            <Card>
              <CardHeader>
                <CardTitle>Unstake Your RWA Tokens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="unstake-amount">Amount to Unstake</Label>
                  <div className="flex gap-2">
                    <Input
                      id="unstake-amount"
                      type="number"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      min="0"
                      max={stakedBalance}
                      placeholder="0.0"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setUnstakeAmount(stakedBalance)}
                    >
                      Max
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Staked Balance: {stakedBalance} RWA
                  </p>
                </div>

                <Button
                  className="w-full"
                  onClick={handleUnstake}
                  disabled={isLoading.unstake || !unstakeAmount || parseFloat(unstakeAmount) <= 0 || parseFloat(unstakeAmount) > parseFloat(stakedBalance)}
                >
                  {isLoading.unstake ? "Unstaking..." : "Unstake RWA Tokens"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 提前套现选项卡 */}
          <TabsContent value="cashout">
            <Card>
              <CardHeader>
                <CardTitle>Early Cash Out</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                        Early Cash Out Warning
                      </p>
                      <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                        Early cash out is subject to a {currentDiscount}% discount from the token value. 
                        Consider holding until maturity for full value.
                      </p>
                    </div>
                  </div>
                </div>
              
                <div className="space-y-2">
                  <Label htmlFor="cashout-amount">Amount to Cash Out</Label>
                  <div className="flex gap-2">
                    <Input
                      id="cashout-amount"
                      type="number"
                      value={cashOutAmount}
                      onChange={(e) => setCashOutAmount(e.target.value)}
                      min="0"
                      max={balance}
                      placeholder="0.0"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setCashOutAmount(balance)}
                    >
                      Max
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Available Balance: {balance} RWA
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Discount Rate</span>
                    <span className="text-sm font-medium text-amber-500">
                      {currentDiscount}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">You Will Receive</span>
                    <span className="text-sm font-medium">
                      {calculateCashOutAmount(cashOutAmount)} Stablecoins
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={handleCashOut}
                  disabled={isLoading.cashOut || !cashOutAmount || parseFloat(cashOutAmount) <= 0 || parseFloat(cashOutAmount) > parseFloat(balance)}
                >
                  {isLoading.cashOut ? "Processing..." : "Cash Out Now"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 到期兑换选项卡 */}
          <TabsContent value="redeem">
            <Card>
              <CardHeader>
                <CardTitle>Redeem at Maturity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isMatured ? (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          Not Yet Matured
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                          This asset will mature on {formatMaturityDate()}. Redemption will be available after this date.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-md">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-emerald-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                            Asset Matured
                          </p>
                          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                            This asset has reached its maturity date. You can now redeem your tokens at the current redemption rate of {redeemRate}%.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="redeem-amount">Amount to Redeem</Label>
                      <div className="flex gap-2">
                        <Input
                          id="redeem-amount"
                          type="number"
                          value={redeemAmount}
                          onChange={(e) => setRedeemAmount(e.target.value)}
                          min="0"
                          max={balance}
                          placeholder="0.0"
                          disabled={!isMatured}
                        />
                        <Button
                          variant="outline"
                          onClick={() => setRedeemAmount(balance)}
                          disabled={!isMatured}
                        >
                          Max
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Available Balance: {balance} RWA
                      </p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Redemption Rate</span>
                        <span className="text-sm font-medium text-emerald-500">
                          {redeemRate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">You Will Receive</span>
                        <span className="text-sm font-medium">
                          {calculateRedeemAmount(redeemAmount)} Stablecoins
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      onClick={handleRedeem}
                      disabled={isLoading.redeem || !redeemAmount || parseFloat(redeemAmount) <= 0 || parseFloat(redeemAmount) > parseFloat(balance) || !isMatured}
                    >
                      {isLoading.redeem ? "Processing..." : "Redeem RWA Tokens"}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-bold mb-6">Your Staking Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CoinsIcon className="h-5 w-5" />
                  Staking Ratio
                </CardTitle>
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
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {stakingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Yield Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rewardTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip />
                      <Line
                        type="monotone"
                        dataKey="rewards"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-bold mb-6">Recent Yield History</h2>
          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewardHistory.map((reward, i) => (
                    <TableRow key={i}>
                      <TableCell>{reward.date}</TableCell>
                      <TableCell>{reward.type}</TableCell>
                      <TableCell className="text-right">{reward.amount} Yield</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
} 