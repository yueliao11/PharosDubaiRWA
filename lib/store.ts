import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 资产持有信息接口
interface AssetHolding {
  id: string;
  assetId: string;
  name: string;
  location: string;
  description?: string;
  tokens: number;
  totalTokens?: number;
  investmentAmount: number;
  propertyValue?: number;
  acquisitionDate: Date;
  maturityDate: Date;
  lastUpdateDate?: Date;
  rentalYield: number;
  assetType?: string;
  squareFootage?: number;
  bedrooms?: number;
  bathrooms?: number;
  occupancy?: number;
  isLocked: boolean;
}

// 交易记录接口
interface Transaction {
  id: string;
  assetId: string;
  assetName?: string;
  type: 'BUY' | 'SELL' | 'STAKE' | 'UNSTAKE' | 'CLAIM_REWARD' | 'CASH_OUT' | 'REDEEM';
  amount: number;
  tokens?: number;
  timestamp: Date;
  txHash?: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  details?: string;
}

// 质押信息接口
interface StakingInfo {
  assetId: string;
  assetName?: string;
  stakedAmount: number;
  stakingDate: Date;
  yieldRate: number;
  unclaimedRewards: number;
  lastRewardUpdate?: Date;
}

// 环境开关：NEXT_PUBLIC_REQUIRE_KYC 默认 true
const KYC_ENABLED =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_REQUIRE_KYC !== "false" &&
  process.env.NEXT_PUBLIC_REQUIRE_KYC !== "0";

interface UserState {
  kycStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
  language: 'en' | 'ar' | 'zh';
  theme: 'light' | 'dark' | 'system';
  portfolio: AssetHolding[];
  transactions: Transaction[];
  stakingInfo: StakingInfo[];
  lastWalletConnection?: Date;
  
  // KYC 状态更新
  updateKycStatus: (status: UserState['kycStatus']) => void;
  
  // 语言和主题更新
  updateLanguage: (language: UserState['language']) => void;
  updateTheme: (theme: UserState['theme']) => void;
  
  // 投资组合管理
  addAssetToPortfolio: (asset: AssetHolding) => void;
  updateAssetInPortfolio: (assetId: string, updates: Partial<AssetHolding>) => void;
  removeAssetFromPortfolio: (assetId: string) => void;
  
  // 交易记录管理
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transactionId: string, updates: Partial<Transaction>) => void;
  
  // 质押管理
  addStakingInfo: (info: StakingInfo) => void;
  updateStakingInfo: (assetId: string, updates: Partial<StakingInfo>) => void;
  removeStakingInfo: (assetId: string) => void;
  
  // 钱包连接记录
  updateLastWalletConnection: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      kycStatus: KYC_ENABLED ? 'NOT_STARTED' : 'APPROVED',
      language: 'en',
      theme: 'light',
      portfolio: [],
      transactions: [],
      stakingInfo: [],
      
      // KYC 状态更新
      updateKycStatus: (status) =>
        set({ kycStatus: KYC_ENABLED ? status : 'APPROVED' }),
      
      // 语言和主题更新
      updateLanguage: (language) => set({ language }),
      updateTheme: (theme) => set({ theme }),
      
      // 投资组合管理
      addAssetToPortfolio: (asset) => 
        set((state) => ({
          portfolio: [...state.portfolio, asset]
        })),
      
      updateAssetInPortfolio: (assetId, updates) => 
        set((state) => ({
          portfolio: state.portfolio.map(asset => 
            asset.assetId === assetId ? { ...asset, ...updates } : asset
          )
        })),
      
      removeAssetFromPortfolio: (assetId) => 
        set((state) => ({
          portfolio: state.portfolio.filter(asset => asset.assetId !== assetId)
        })),
      
      // 交易记录管理
      addTransaction: (transaction) => 
        set((state) => ({
          transactions: [...state.transactions, transaction]
        })),
      
      updateTransaction: (transactionId, updates) => 
        set((state) => ({
          transactions: state.transactions.map(tx => 
            tx.id === transactionId ? { ...tx, ...updates } : tx
          )
        })),
      
      // 质押管理
      addStakingInfo: (info) => 
        set((state) => ({
          stakingInfo: [...state.stakingInfo, info]
        })),
      
      updateStakingInfo: (assetId, updates) => 
        set((state) => ({
          stakingInfo: state.stakingInfo.map(info => 
            info.assetId === assetId ? { ...info, ...updates } : info
          )
        })),
      
      removeStakingInfo: (assetId) => 
        set((state) => ({
          stakingInfo: state.stakingInfo.filter(info => info.assetId !== assetId)
        })),
      
      // 钱包连接记录
      updateLastWalletConnection: () => 
        set({ lastWalletConnection: new Date() }),
    }),
    {
      name: 'user-storage',
    }
  )
);