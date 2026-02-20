import api from './api'
import type { SpendingByMonth, SpendingByCategory, SavingsOpportunity, TrendData } from '../types'

export const analyticsService = {
  getSpending: async (): Promise<SpendingByMonth[]> => {
    const response = await api.get<SpendingByMonth[]>('/analytics/spending')
    return response.data
  },
  
  getCategories: async (): Promise<SpendingByCategory[]> => {
    const response = await api.get<SpendingByCategory[]>('/analytics/categories')
    return response.data
  },
  
  getSavings: async (): Promise<SavingsOpportunity[]> => {
    const response = await api.get<SavingsOpportunity[]>('/analytics/savings')
    return response.data
  },
  
  getTrends: async (): Promise<TrendData[]> => {
    const response = await api.get<TrendData[]>('/analytics/trends')
    return response.data
  }
}
