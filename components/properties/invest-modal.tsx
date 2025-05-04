"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useUserStore } from '@/lib/store';
import { useDYTToken } from '@/hooks/use-dyt-token';
import { InvestmentService } from '@/lib/services/investment-service';
import { Loader2, AlertCircle, CheckCircle2, X, TrendingUp, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';

// 投资状态枚举
enum InvestmentStatus {
  INPUTTING = 'inputting',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed'
}

interface InvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    rentalYield: number;
    fundingProgress: number;
    financials: {
      tokenPrice: number;
      minInvestment: number;
      expectedROI: number;
    };
    image?: string;
  };
}

export function InvestModal({ isOpen, onClose, property }: InvestModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { kycStatus } = useUserStore();
  const { writeContractAsync } = useWriteContract();
  const { approveTokens } = useDYTToken();
  
  const [investment, setInvestment] = useState(property.financials.minInvestment);
  const [status, setStatus] = useState<InvestmentStatus>(InvestmentStatus.INPUTTING);
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [acquiredTokens, setAcquiredTokens] = useState(0);
  
  // 计算相关值
  const tokens = investment / property.financials.tokenPrice;
  const ownership = (investment / property.price) * 100;
  const returns = InvestmentService.calculateExpectedReturns(investment, property.financials.expectedROI);
  const platformFee = InvestmentService.calculatePlatformFee(investment);
  const totalAmount = investment + platformFee;
  
  // 监听连接状态和KYC状态的变化
  useEffect(() => {
    if (isOpen) {
      if (!isConnected) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet to continue with the investment",
          variant: "destructive",
        });
        onClose();
      } else if (kycStatus !== 'APPROVED') {
        toast({
          title: "KYC required",
          description: "Please complete KYC verification to invest",
          variant: "destructive", 
        });
        router.push('/register');
        onClose();
      }
    }
  }, [isOpen, isConnected, kycStatus, onClose, toast, router]);
  
  // 处理投资金额变化
  const handleInvestmentChange = (value: number) => {
    if (value < property.financials.minInvestment) {
      setInvestment(property.financials.minInvestment);
    } else if (value > property.price * 0.5) { // 设置最大投资为资产价值的50%
      setInvestment(property.price * 0.5);
    } else {
      setInvestment(value);
    }
  };
  
  // 处理投资确认
  const handleConfirmInvestment = async () => {
    if (!agreed) {
      toast({
        title: "Agreement Required",
        description: "You must agree to the terms before investing",
        variant: "destructive",
      });
      return;
    }
    
    if (!address) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to invest",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setStatus(InvestmentStatus.PROCESSING);
      
      // 检查投资可行性
      const feasibilityCheck = await InvestmentService.checkInvestmentFeasibility(address, investment);
      if (!feasibilityCheck.feasible) {
        throw new Error(feasibilityCheck.reasons.join('. '));
      }
      
      // 使用投资服务处理代币购买
      // 在实际环境中使用
      let result;
      
      if (process.env.NODE_ENV === 'production') {
        // 先授权代币合约使用资金
        await approveTokens(totalAmount.toString());
        
        // 购买资产代币
        result = await InvestmentService.purchaseAssetTokens(
          address,
          property.id,
          investment,
          writeContractAsync
        );
      } else {
        // 开发环境中使用模拟服务
        result = await InvestmentService.simulatePurchase(property.id, investment);
      }
      
      // 设置交易结果信息
      setTransactionHash(result.transactionHash);
      setAcquiredTokens(result.tokenAmount);
      
      // 更新用户投资组合
      InvestmentService.updateUserPortfolio(property.id, result.tokenAmount);
      
      // 更新状态为成功
      setStatus(InvestmentStatus.SUCCESS);
      
      // 显示成功提示
      toast({
        title: "Investment Successful",
        description: `You have successfully invested in ${property.title}`,
      });
      
    } catch (error) {
      console.error('Investment failed:', error);
      setStatus(InvestmentStatus.FAILED);
      setErrorMessage(error instanceof Error ? error.message : 'Transaction failed for unknown reason');
      
      // 显示失败提示
      toast({
        title: "Investment Failed",
        description: error instanceof Error ? error.message : 'Transaction failed',
        variant: "destructive",
      });
    }
  };
  
  // 处理重试
  const handleRetry = () => {
    setStatus(InvestmentStatus.INPUTTING);
    setErrorMessage('');
  };
  
  // 处理关闭并重置
  const handleClose = () => {
    if (status !== InvestmentStatus.PROCESSING) {
      onClose();
      // 重置状态（延迟执行以避免用户看到状态重置）
      setTimeout(() => {
        setStatus(InvestmentStatus.INPUTTING);
        setInvestment(property.financials.minInvestment);
        setAgreed(false);
        setErrorMessage('');
        setTransactionHash('');
        setAcquiredTokens(0);
      }, 300);
    }
  };
  
  // 查看投资组合
  const handleViewPortfolio = () => {
    router.push('/portfolio');
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {/* 标题区 */}
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center justify-between">
            <span>Invest in {property.title}</span>
            {status === InvestmentStatus.SUCCESS && (
              <span className="text-sm font-normal bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-full">
                Investment Successful
              </span>
            )}
          </DialogTitle>
          <DialogDescription>
            Secure your share in this premium Dubai real estate opportunity
          </DialogDescription>
        </DialogHeader>
        
        {/* 资产概要区 */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
              {property.image ? (
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-muted h-full w-full flex items-center justify-center">
                  <HelpCircle className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div>
              <h4 className="font-medium">{property.title}</h4>
              <p className="text-sm text-muted-foreground">{property.location}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Property Value</p>
              <p className="font-medium">${property.price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Yield</p>
              <p className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {property.rentalYield}%
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Token Price</p>
              <p className="font-medium">${property.financials.tokenPrice}</p>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Funding Progress</span>
              <span>{property.fundingProgress}%</span>
            </div>
            <Progress value={property.fundingProgress} className="h-2" />
          </div>
        </div>
        
        <Separator />
        
        {/* 根据状态显示不同内容 */}
        {status === InvestmentStatus.INPUTTING && (
          <div className="py-2 space-y-6">
            {/* 投资表单区 */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="investment-amount">Investment Amount (USD)</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input
                    id="investment-amount"
                    type="number"
                    value={investment}
                    onChange={(e) => handleInvestmentChange(Number(e.target.value))}
                    min={property.financials.minInvestment}
                    max={property.price * 0.5}
                  />
                </div>
                <Slider
                  value={[investment]}
                  min={property.financials.minInvestment}
                  max={Math.min(property.price * 0.2, 100000)} // 限制滑块最大值，提升可用性
                  step={property.financials.tokenPrice}
                  onValueChange={([value]) => handleInvestmentChange(value)}
                  className="mt-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Min: ${property.financials.minInvestment}</span>
                  <span>Max: ${Math.min(property.price * 0.5, 1000000).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm">Number of Tokens</p>
                  <p className="font-medium">{tokens.toFixed(2)} DYT</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-sm">Ownership Percentage</p>
                  <p className="font-medium">{ownership.toFixed(6)}%</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-sm">Platform Fee (2%)</p>
                  <p className="font-medium">${platformFee.toFixed(2)}</p>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Total Amount</p>
                  <p className="font-medium">${totalAmount.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                  Expected Returns
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly</p>
                    <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                      ${returns.monthly.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Annual</p>
                    <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                      ${returns.annual.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 法律同意区 */}
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreed} 
                onCheckedChange={(checked) => setAgreed(checked as boolean)} 
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms of service and privacy policy
                </label>
                <p className="text-xs text-muted-foreground">
                  By investing, I confirm that I have read and understood the{" "}
                  <a href="#" className="text-primary hover:underline">investment terms</a>,{" "}
                  <a href="#" className="text-primary hover:underline">risk disclosure</a>, and{" "}
                  <a href="#" className="text-primary hover:underline">fee structure</a>.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {status === InvestmentStatus.PROCESSING && (
          <div className="py-8 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="text-center">
              <h3 className="text-lg font-medium">Processing your investment</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please confirm the transaction in your wallet
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                This might take a few moments. Please don't close this window.
              </p>
            </div>
          </div>
        )}
        
        {status === InvestmentStatus.SUCCESS && (
          <div className="py-6 flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-medium">Investment Successful!</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You have successfully invested ${investment.toLocaleString()} in {property.title}
              </p>
            </div>
            
            <div className="bg-muted/30 w-full p-4 rounded-lg space-y-4">
              <div className="flex justify-between">
                <p className="text-sm">Investment Amount</p>
                <p className="font-medium">${investment.toLocaleString()}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm">DYT Tokens Acquired</p>
                <p className="font-medium">{acquiredTokens.toFixed(2)} DYT</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm">Transaction</p>
                <a 
                  href={`https://etherscan.io/tx/${transactionHash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center text-sm"
                >
                  View <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        )}
        
        {status === InvestmentStatus.FAILED && (
          <div className="py-6 flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-medium">Transaction Failed</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We couldn't process your investment
              </p>
              
              {errorMessage && (
                <div className="mt-4 p-3 bg-destructive/5 border border-destructive/10 rounded-md text-left">
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}
              
              <p className="text-sm mt-4">
                This could be due to insufficient funds, network issues, or wallet rejection. Please try again or contact support if the issue persists.
              </p>
            </div>
          </div>
        )}
        
        {/* 底部按钮区 */}
        <DialogFooter className="mt-4">
          {status === InvestmentStatus.INPUTTING && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleConfirmInvestment} disabled={!agreed}>
                Confirm Investment
              </Button>
            </>
          )}
          
          {status === InvestmentStatus.PROCESSING && (
            <Button variant="outline" disabled>
              Processing...
            </Button>
          )}
          
          {status === InvestmentStatus.SUCCESS && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleViewPortfolio}>
                View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
          
          {status === InvestmentStatus.FAILED && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleRetry}>
                Try Again
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 