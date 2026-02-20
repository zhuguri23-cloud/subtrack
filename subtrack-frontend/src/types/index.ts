export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AuthResponse {
  success: boolean
  token: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name: string
}

export interface Subscription {
  id: string
  userId: string
  name: string
  category: string
  cost: number
  currency: string
  billingCycle: 'monthly' | 'yearly' | 'quarterly' | 'weekly'
  startDate: string
  nextRenewal: string
  description?: string
  logoUrl?: string
  createdAt: string
  updatedAt: string
}

export interface SubscriptionInput {
  name: string
  category: string
  cost: number
  currency: string
  billingCycle: 'monthly' | 'yearly' | 'quarterly' | 'weekly'
  startDate: string
  description?: string
  logoUrl?: string
}

export interface SubscriptionStats {
  totalMonthly: number
  totalYearly: number
  totalQuarterly: number
  activeCount: number
  upcomingRenewals: Subscription[]
}

export interface MarketplaceItem {
  id: string
  name: string
  category: string
  description: string
  startingPrice: number
  logoUrl: string
  rating: number
  websiteUrl: string
}

export interface SpendingByMonth {
  month: string
  total: number
}

export interface SpendingByCategory {
  category: string
  total: number
  count: number
}

export interface SavingsOpportunity {
  id: string
  type: string
  title: string
  description: string
  potentialSavings: number
}

export interface TrendData {
  month: string
  spending: number
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}
