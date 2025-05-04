// Types for the Dubai Real Estate RWA Tokenization Platform

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  profileImage?: string;
  kycStatus: KYCStatus;
  createdAt: Date;
  role: UserRole;
  preferences: UserPreferences;
}

export enum UserRole {
  INVESTOR = 'INVESTOR',
  ADMIN = 'ADMIN',
}

export enum KYCStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface UserPreferences {
  language: 'en' | 'ar' | 'zh';
  theme: 'light' | 'dark' | 'system';
  currency: 'USD' | 'AED' | 'ETH';
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  marketing: boolean;
  newProperties: boolean;
  investmentUpdates: boolean;
  payoutNotifications: boolean;
}

// Property Types
export interface Property {
  id: string;
  title: string;
  description: string;
  location: Location;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  images: string[];
  propertyType: PropertyType;
  status: PropertyStatus;
  rentalYield: number;
  totalInvestors: number;
  fundingGoal: number;
  fundingProgress: number;
  tokenSymbol: string;
  tokenPrice: number;
  investmentPeriod: number; // in months
  expectedROI: number;
  historicalPerformance?: PerformanceData[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  address: string;
  city: string;
  district: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export enum PropertyType {
  APARTMENT = 'APARTMENT',
  VILLA = 'VILLA',
  TOWNHOUSE = 'TOWNHOUSE',
  PENTHOUSE = 'PENTHOUSE',
  COMMERCIAL = 'COMMERCIAL',
}

export enum PropertyStatus {
  UPCOMING = 'UPCOMING',
  FUNDING = 'FUNDING',
  FUNDED = 'FUNDED',
  INCOME_GENERATING = 'INCOME_GENERATING',
}

export interface PerformanceData {
  period: string;
  rentalYield: number;
  occupancyRate: number;
  propertyValue: number;
}

// Investment Types
export interface Investment {
  id: string;
  userId: string;
  propertyId: string;
  tokenAmount: number;
  investmentValue: number;
  status: InvestmentStatus;
  transactionHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum InvestmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

// Token Types
export interface Token {
  id: string;
  symbol: string;
  name: string;
  contractAddress: string;
  totalSupply: number;
  price: number;
  propertyId: string;
}

// Wallet Types
export interface WalletDetails {
  address: string;
  network: string;
  balance: number;
  tokens: TokenBalance[];
}

export interface TokenBalance {
  tokenId: string;
  symbol: string;
  balance: number;
  value: number;
}

// Transaction Types
export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  tokenAmount?: number;
  tokenId?: string;
  txHash?: string;
  createdAt: Date;
}

export enum TransactionType {
  BUY = 'BUY',
  SELL = 'SELL',
  DIVIDEND = 'DIVIDEND',
  REDEMPTION = 'REDEMPTION',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED',
}

// Market Data Types
export interface MarketData {
  tokenId: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  timestamp: Date;
}

// Dashboard Types
export interface DashboardData {
  totalInvestment: number;
  totalTokens: number;
  portfolioValue: number;
  portfolioChange: number;
  upcomingDividends: number;
  properties: PropertySummary[];
  recentTransactions: Transaction[];
  portfolioPerformance: PerformancePoint[];
}

export interface PropertySummary {
  id: string;
  title: string;
  tokenSymbol: string;
  tokenAmount: number;
  value: number;
  yield: number;
}

export interface PerformancePoint {
  date: Date;
  value: number;
}

// KYC Types
export interface KYCDocument {
  id: string;
  userId: string;
  type: DocumentType;
  status: DocumentStatus;
  fileUrl: string;
  createdAt: Date;
  updatedAt?: Date;
}

export enum DocumentType {
  ID_CARD = 'ID_CARD',
  PASSPORT = 'PASSPORT',
  DRIVING_LICENSE = 'DRIVING_LICENSE',
  PROOF_OF_ADDRESS = 'PROOF_OF_ADDRESS',
  BANK_STATEMENT = 'BANK_STATEMENT',
}

export enum DocumentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}