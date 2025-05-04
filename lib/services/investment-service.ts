'use client';

import { parseEther, formatEther } from 'viem';
import { useWriteContract, useReadContract } from 'wagmi';
import { DYT_TOKEN_ADDRESS, DYT_TOKEN_ABI, PROPERTY_REGISTRY_ADDRESS, PROPERTY_REGISTRY_ABI } from '@/lib/contracts';
import { useUserStore } from '@/lib/store';

export class InvestmentService {
  // 检查投资是否可行（用户余额、KYC状态等）
  static async checkInvestmentFeasibility(address: `0x${string}`, amount: number) {
    try {
      // 实际应用中，这里会检查:
      // 1. 用户的钱包余额是否足够
      // 2. 资产是否仍然可投资
      // 3. 是否超过投资上限
      // 4. 用户的KYC状态是否有效
      
      // 为了示例，我们假设所有检查都通过
      const { kycStatus } = useUserStore.getState();
      
      if (kycStatus !== 'APPROVED') {
        return {
          feasible: false,
          reasons: ['KYC verification required before investing']
        };
      }
      
      // 模拟余额检查
      const balanceCheck = await this.simulateBalanceCheck(address, amount);
      if (!balanceCheck.sufficient) {
        return {
          feasible: false,
          reasons: [balanceCheck.message]
        };
      }
      
      return {
        feasible: true,
        reasons: []
      };
    } catch (error) {
      console.error('Error checking investment feasibility:', error);
      return {
        feasible: false,
        reasons: ['Failed to check investment feasibility. Please try again.']
      };
    }
  }
  
  // 模拟余额检查
  static async simulateBalanceCheck(address: `0x${string}`, amount: number) {
    // 在实际应用中，这里将调用合约或API获取真实余额
    // 这里仅用于演示
    const simulatedBalance = 50000; // 假设用户有50,000单位的资金
    const sufficientBalance = amount <= simulatedBalance;
    
    return {
      sufficient: sufficientBalance,
      message: sufficientBalance 
        ? 'Sufficient balance'
        : `Insufficient balance. You need ${amount} USD but only have ${simulatedBalance} USD available.`
    };
  }
  
  // 计算投资获得的代币数量
  static calculateTokenAmount(investmentAmount: number, tokenPrice: number) {
    return investmentAmount / tokenPrice;
  }
  
  // 计算投资所需的平台费用
  static calculatePlatformFee(amount: number, feePercentage = 2) {
    return amount * (feePercentage / 100);
  }
  
  // 计算投资预期回报
  static calculateExpectedReturns(amount: number, expectedROI: number) {
    const annualReturn = amount * (expectedROI / 100);
    const monthlyReturn = annualReturn / 12;
    
    return {
      monthly: monthlyReturn,
      annual: annualReturn
    };
  }
  
  // 购买资产代币
  static async purchaseAssetTokens(
    address: `0x${string}`,
    assetId: string,
    amount: number,
    writeContractAsync: any
  ) {
    try {
      console.log(`Purchasing tokens for asset ${assetId}, amount: ${amount}`);
      
      // 1. 获取资产代币价格
      const assetDetails = await this.getAssetDetails(assetId);
      const tokenAmount = this.calculateTokenAmount(amount, assetDetails.tokenPrice);
      
      // 2. 调用智能合约购买代币
      const txHash = await writeContractAsync({
        address: PROPERTY_REGISTRY_ADDRESS,
        abi: PROPERTY_REGISTRY_ABI,
        functionName: 'buyPropertyTokens',
        args: [assetId, parseEther(amount.toString())],
        value: parseEther(amount.toString())
      });
      
      console.log(`Transaction hash: ${txHash}`);
      
      // 3. 更新用户的投资组合
      this.updateUserPortfolio(assetId, tokenAmount, amount);
      
      return {
        success: true,
        transactionHash: txHash,
        tokenAmount: tokenAmount
      };
    } catch (error) {
      console.error('Purchase tokens failed:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to purchase tokens');
    }
  }
  
  // 获取资产详情
  static async getAssetDetails(assetId: string) {
    // 在实际应用中，这里将调用合约获取资产详情
    // 现在我们使用模拟数据
    return {
      totalSupply: 10000,
      tokenPrice: 100,
      tokensSold: 2500,
      fundingGoal: 1000000,
      isActive: true
    };
  }
  
  // 模拟交易处理，用于开发和演示
  static async simulatePurchase(assetId: string, amount: number) {
    // 模拟交易延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 模拟成功概率 (95% 成功率)
    const isSuccess = Math.random() < 0.95;
    
    if (isSuccess) {
      // 模拟交易哈希
      const txHash = `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      const tokenAmount = this.calculateTokenAmount(amount, 100); // 假设代币价格是100
      
      // 更新用户的投资组合
      this.updateUserPortfolio(assetId, tokenAmount, amount);
      
      return {
        success: true,
        transactionHash: txHash,
        tokenAmount: tokenAmount
      };
    } else {
      throw new Error('Transaction rejected by the network');
    }
  }
  
  // 更新用户投资组合的状态
  static updateUserPortfolio(assetId: string, tokenAmount: number, investmentAmount?: number) {
    try {
      const { addAssetToPortfolio, portfolio } = useUserStore.getState();
      const existingAsset = portfolio.find(asset => asset.assetId === assetId);
      
      if (existingAsset) {
        // 如果资产已存在，更新代币数量
        addAssetToPortfolio({
          ...existingAsset,
          tokens: existingAsset.tokens + tokenAmount,
          investmentAmount: (existingAsset.investmentAmount || 0) + (investmentAmount || 0),
          lastUpdateDate: new Date().toISOString()
        });
      } else {
        // 创建新的投资记录
        addAssetToPortfolio({
          assetId,
          tokens: tokenAmount,
          investmentAmount: investmentAmount || 0,
          acquisitionDate: new Date().toISOString(),
          lastUpdateDate: new Date().toISOString()
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to update portfolio:', error);
      return false;
    }
  }
  
  // 获取用户的投资组合
  static getUserPortfolio() {
    try {
      const { portfolio } = useUserStore.getState();
      return portfolio;
    } catch (error) {
      console.error('Failed to get portfolio:', error);
      return [];
    }
  }
  
  // 计算投资组合总值
  static calculatePortfolioValue(portfolio: any[]) {
    try {
      return portfolio.reduce((total, asset) => {
        return total + (asset.investmentAmount || 0);
      }, 0);
    } catch (error) {
      console.error('Failed to calculate portfolio value:', error);
      return 0;
    }
  }
} 