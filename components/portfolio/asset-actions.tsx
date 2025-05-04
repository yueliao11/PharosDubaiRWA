"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Coins, DollarSign, Wallet } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUserStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

interface AssetActionsProps {
  assetId: string;
  maturityDate?: Date;
  isLocked?: boolean;
}

export function AssetActions({ assetId, maturityDate, isLocked = false }: AssetActionsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { kycStatus } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  
  // 判断是否已到期
  const isMatured = maturityDate ? new Date() >= maturityDate : false;
  
  const handleClick = (action: 'stake' | 'cashout' | 'redeem') => {
    if (kycStatus !== 'APPROVED') {
      toast({
        title: 'KYC Required',
        description: 'You need to complete KYC verification to perform this action.',
        variant: 'destructive',
      });
      return;
    }
    
    if (isLocked) {
      toast({
        title: 'Asset Locked',
        description: 'This asset is currently locked and cannot be modified.',
        variant: 'destructive',
      });
      return;
    }
    
    if (action === 'redeem' && !isMatured) {
      toast({
        title: 'Not Matured',
        description: 'This asset has not reached its maturity date yet.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    // 在实际应用中这可能包含预先检查逻辑
    setTimeout(() => {
      router.push(`/portfolio/${assetId}/staking?tab=${action}`);
      setIsLoading(false);
    }, 300);
  };
  
  return (
    <div className="flex space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleClick('stake')} 
              disabled={isLoading}
            >
              <Coins className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Stake tokens for yield</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleClick('cashout')} 
              disabled={isLoading}
            >
              <DollarSign className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Early cash out (with discount)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={isMatured ? "default" : "outline"} 
              size="icon"
              onClick={() => handleClick('redeem')} 
              disabled={isLoading || !isMatured}
            >
              <Wallet className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isMatured ? "Redeem at maturity" : "Not yet matured"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
} 