'use client';

import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { PROPERTY_REGISTRY_ADDRESS, PROPERTY_REGISTRY_ABI } from '@/lib/contracts';
import { formatEther, parseEther } from 'viem';
import { useState, useEffect } from 'react';

export function useRwaToken(assetId: string) {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [maturityDate, setMaturityDate] = useState<Date | null>(null);
  const [currentDiscount, setCurrentDiscount] = useState<number>(0);
  const [redeemRate, setRedeemRate] = useState<number>(100); // 默认1:1兑换

  // 读取代币余额
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: PROPERTY_REGISTRY_ADDRESS,
    abi: PROPERTY_REGISTRY_ABI,
    functionName: 'getUserAssetBalance',
    args: [assetId, address!],
    query: { enabled: !!address && !!assetId },
  });

  // 读取质押余额
  const { data: stakedBalance, refetch: refetchStakedBalance } = useReadContract({
    address: PROPERTY_REGISTRY_ADDRESS,
    abi: PROPERTY_REGISTRY_ABI,
    functionName: 'getStakedAssetBalance',
    args: [assetId, address!],
    query: { enabled: !!address && !!assetId },
  });

  // 读取奖励余额
  const { data: rewards, refetch: refetchRewards } = useReadContract({
    address: PROPERTY_REGISTRY_ADDRESS,
    abi: PROPERTY_REGISTRY_ABI,
    functionName: 'getAssetRewards',
    args: [assetId, address!],
    query: { enabled: !!address && !!assetId },
  });

  // 读取资产详情，包括到期时间和折扣信息
  const { data: assetDetails, refetch: refetchAssetDetails } = useReadContract({
    address: PROPERTY_REGISTRY_ADDRESS,
    abi: PROPERTY_REGISTRY_ABI,
    functionName: 'getAssetDetails',
    args: [assetId],
    query: { enabled: !!assetId },
  });

  // 设置资产详情数据
  useEffect(() => {
    if (assetDetails) {
      // 假设合约返回的数据包含到期时间和当前折扣率
      const [_, __, ___, ____, isActive, maturityTimestamp, discountRate, redemptionRate] = assetDetails;
      
      // 将时间戳转换为日期对象
      if (maturityTimestamp) {
        setMaturityDate(new Date(Number(maturityTimestamp) * 1000));
      }
      
      // 设置当前折扣率
      if (discountRate) {
        setCurrentDiscount(Number(discountRate));
      }
      
      // 设置兑换比率
      if (redemptionRate) {
        setRedeemRate(Number(redemptionRate));
      }
    }
  }, [assetDetails]);

  // 刷新所有数据
  const refreshData = async () => {
    await Promise.all([
      refetchBalance(),
      refetchStakedBalance(),
      refetchRewards(),
      refetchAssetDetails()
    ]);
  };

  // 质押RWA代币
  const stakeTokens = async (amount: string) => {
    if (!address || !assetId) return;
    
    try {
      await writeContractAsync({
        address: PROPERTY_REGISTRY_ADDRESS,
        abi: PROPERTY_REGISTRY_ABI,
        functionName: 'stakeAsset',
        args: [assetId, parseEther(amount)],
      });
      
      await refreshData();
    } catch (error) {
      console.error('Staking RWA tokens failed:', error);
      throw error;
    }
  };

  // 取消质押RWA代币
  const unstakeTokens = async (amount: string) => {
    if (!address || !assetId) return;
    
    try {
      await writeContractAsync({
        address: PROPERTY_REGISTRY_ADDRESS,
        abi: PROPERTY_REGISTRY_ABI,
        functionName: 'unstakeAsset',
        args: [assetId, parseEther(amount)],
      });
      
      await refreshData();
    } catch (error) {
      console.error('Unstaking RWA tokens failed:', error);
      throw error;
    }
  };

  // 领取奖励
  const claimYield = async () => {
    if (!address || !assetId) return;
    
    try {
      await writeContractAsync({
        address: PROPERTY_REGISTRY_ADDRESS,
        abi: PROPERTY_REGISTRY_ABI,
        functionName: 'claimAssetYield',
        args: [assetId],
      });
      
      await refreshData();
    } catch (error) {
      console.error('Claiming yield failed:', error);
      throw error;
    }
  };

  // 提前折价套现
  const earlyCashOut = async (amount: string) => {
    if (!address || !assetId) return;
    
    try {
      await writeContractAsync({
        address: PROPERTY_REGISTRY_ADDRESS,
        abi: PROPERTY_REGISTRY_ABI,
        functionName: 'earlyCashOut',
        args: [assetId, parseEther(amount)],
      });
      
      await refreshData();
      
      // 返回实际收到的稳定币金额(这里做一个模拟计算)
      const discountedAmount = parseFloat(amount) * (1 - currentDiscount / 100);
      return discountedAmount.toFixed(2);
    } catch (error) {
      console.error('Early cash out failed:', error);
      throw error;
    }
  };

  // 到期兑换
  const redeem = async (amount: string) => {
    if (!address || !assetId) return;
    
    // 检查是否已到期
    if (maturityDate && maturityDate > new Date()) {
      throw new Error("Asset has not reached maturity date yet");
    }
    
    try {
      await writeContractAsync({
        address: PROPERTY_REGISTRY_ADDRESS,
        abi: PROPERTY_REGISTRY_ABI,
        functionName: 'redeem',
        args: [assetId, parseEther(amount)],
      });
      
      await refreshData();
      
      // 返回实际收到的稳定币金额(按照兑换比率计算)
      const redeemedAmount = parseFloat(amount) * (redeemRate / 100);
      return redeemedAmount.toFixed(2);
    } catch (error) {
      console.error('Redemption failed:', error);
      throw error;
    }
  };

  // 批准RWA代币转账
  const approveTokens = async (amount: string) => {
    if (!address || !assetId) return;
    
    try {
      await writeContractAsync({
        address: PROPERTY_REGISTRY_ADDRESS,
        abi: PROPERTY_REGISTRY_ABI,
        functionName: 'approve',
        args: [PROPERTY_REGISTRY_ADDRESS, parseEther(amount)],
      });
    } catch (error) {
      console.error('Token approval failed:', error);
      throw error;
    }
  };

  return {
    balance: balance ? formatEther(balance) : '0',
    stakedBalance: stakedBalance ? formatEther(stakedBalance) : '0',
    rewards: rewards ? formatEther(rewards) : '0',
    maturityDate,
    currentDiscount,
    redeemRate,
    isMatured: maturityDate ? maturityDate <= new Date() : false,
    stakeTokens,
    unstakeTokens,
    claimYield,
    earlyCashOut,
    redeem,
    approveTokens,
    refreshData,
  };
} 