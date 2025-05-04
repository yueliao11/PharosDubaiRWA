'use client';

import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { DYT_TOKEN_ADDRESS, DYT_TOKEN_ABI } from '@/lib/contracts';
import { formatEther, parseEther } from 'viem';

export function useDYTToken() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const { data: balance } = useReadContract({
    address: DYT_TOKEN_ADDRESS,
    abi: DYT_TOKEN_ABI,
    functionName: 'balanceOf',
    args: [address!],
    query: { enabled: !!address },
  });

  const { data: stakedBalance } = useReadContract({
    address: DYT_TOKEN_ADDRESS,
    abi: DYT_TOKEN_ABI,
    functionName: 'getStakedBalance',
    args: [address!],
    query: { enabled: !!address },
  });

  const { data: rewards } = useReadContract({
    address: DYT_TOKEN_ADDRESS,
    abi: DYT_TOKEN_ABI,
    functionName: 'getRewards',
    args: [address!],
    query: { enabled: !!address },
  });

  const stake = async (amount: string) => {
    if (!address) return;
    
    try {
      await writeContractAsync({
        address: DYT_TOKEN_ADDRESS,
        abi: DYT_TOKEN_ABI,
        functionName: 'stake',
        args: [parseEther(amount)],
      });
    } catch (error) {
      console.error('Staking failed:', error);
      throw error;
    }
  };

  const unstake = async (amount: string) => {
    if (!address) return;
    
    try {
      await writeContractAsync({
        address: DYT_TOKEN_ADDRESS,
        abi: DYT_TOKEN_ABI,
        functionName: 'unstake',
        args: [parseEther(amount)],
      });
    } catch (error) {
      console.error('Unstaking failed:', error);
      throw error;
    }
  };

  const claimRewards = async () => {
    if (!address) return;
    
    try {
      await writeContractAsync({
        address: DYT_TOKEN_ADDRESS,
        abi: DYT_TOKEN_ABI,
        functionName: 'claimRewards',
        args: [],
      });
    } catch (error) {
      console.error('Claim rewards failed:', error);
      throw error;
    }
  };

  // Add token approval function
  const approveTokens = async (amount: string) => {
    if (!address) return;
    
    try {
      await writeContractAsync({
        address: DYT_TOKEN_ADDRESS,
        abi: DYT_TOKEN_ABI,
        functionName: 'approve',
        args: [DYT_TOKEN_ADDRESS, parseEther(amount)],
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
    stake,
    unstake,
    claimRewards,
    approveTokens,
  };
}