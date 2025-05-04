import { erc20Abi } from 'viem';

export const DYT_TOKEN_ADDRESS = '0x1234567890123456789012345678901234567890'; // Replace with actual address

export const PROPERTY_REGISTRY_ADDRESS = '0x2345678901234567890123456789012345678901'; // Replace with actual address

export const DYT_TOKEN_ABI = [
  ...erc20Abi,
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getStakedBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getRewards',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const PROPERTY_REGISTRY_ABI = [
  ...erc20Abi,
  {
    inputs: [
      { internalType: 'string', name: 'assetId', type: 'string' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'buyPropertyTokens',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'assetId', type: 'string' },
      { internalType: 'address', name: 'user', type: 'address' }
    ],
    name: 'getUserAssetBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'assetId', type: 'string' },
    ],
    name: 'getAssetDetails',
    outputs: [
      { internalType: 'uint256', name: 'totalSupply', type: 'uint256' },
      { internalType: 'uint256', name: 'tokenPrice', type: 'uint256' },
      { internalType: 'uint256', name: 'tokensSold', type: 'uint256' },
      { internalType: 'uint256', name: 'fundingGoal', type: 'uint256' },
      { internalType: 'bool', name: 'isActive', type: 'bool' },
      { internalType: 'uint256', name: 'maturityTimestamp', type: 'uint256' },
      { internalType: 'uint256', name: 'discountRate', type: 'uint256' },
      { internalType: 'uint256', name: 'redemptionRate', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'pageNumber', type: 'uint256' },
      { internalType: 'uint256', name: 'pageSize', type: 'uint256' }
    ],
    name: 'getAvailableProperties',
    outputs: [
      { 
        components: [
          { internalType: 'string', name: 'id', type: 'string' },
          { internalType: 'string', name: 'title', type: 'string' },
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'tokenPrice', type: 'uint256' },
          { internalType: 'uint256', name: 'fundingGoal', type: 'uint256' },
          { internalType: 'uint256', name: 'fundedAmount', type: 'uint256' },
          { internalType: 'bool', name: 'isActive', type: 'bool' }
        ],
        internalType: 'struct PropertyRegistry.PropertySummary[]',
        name: 'properties',
        type: 'tuple[]'
      },
      { internalType: 'uint256', name: 'totalCount', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'user', type: 'address' }
    ],
    name: 'getUserProperties',
    outputs: [
      { 
        components: [
          { internalType: 'string', name: 'propertyId', type: 'string' },
          { internalType: 'uint256', name: 'tokenAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'investmentAmount', type: 'uint256' },
          { internalType: 'uint256', name: 'timestamp', type: 'uint256' }
        ],
        internalType: 'struct PropertyRegistry.UserInvestment[]',
        name: 'investments',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function',
  },
  // RWA 代币质押相关接口
  {
    inputs: [
      { internalType: 'string', name: 'assetId', type: 'string' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'stakeAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'assetId', type: 'string' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'unstakeAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'assetId', type: 'string' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'getStakedAssetBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'assetId', type: 'string' },
      { internalType: 'address', name: 'account', type: 'address' }
    ],
    name: 'getAssetRewards',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'assetId', type: 'string' }
    ],
    name: 'claimAssetYield',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // 提前折价套现接口
  {
    inputs: [
      { internalType: 'string', name: 'assetId', type: 'string' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'earlyCashOut',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  // 到期兑换接口
  {
    inputs: [
      { internalType: 'string', name: 'assetId', type: 'string' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'redeem',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  }
] as const;