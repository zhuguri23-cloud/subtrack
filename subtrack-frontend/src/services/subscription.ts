import api from './api'
import type { Subscription, SubscriptionInput, SubscriptionStats, MarketplaceItem } from '../types'

export const subscriptionService = {
  getAll: async (): Promise<Subscription[]> => {
    const response = await api.get<Subscription[]>('/subscriptions')
    return response.data
  },
  
  getById: async (id: string): Promise<Subscription> => {
    const response = await api.get<Subscription>(`/subscriptions/${id}`)
    return response.data
  },
  
  create: async (data: SubscriptionInput): Promise<Subscription> => {
    const response = await api.post<Subscription>('/subscriptions', data)
    return response.data
  },
  
  update: async (id: string, data: SubscriptionInput): Promise<Subscription> => {
    const response = await api.put<Subscription>(`/subscriptions/${id}`, data)
    return response.data
  },
  
  delete: async (id: string): Promise<void> => {
    await api.delete(`/subscriptions/${id}`)
  },
  
  getStats: async (): Promise<SubscriptionStats> => {
    const response = await api.get<SubscriptionStats>('/subscriptions/stats')
    return response.data
  },
  
  getUpcoming: async (): Promise<Subscription[]> => {
    const response = await api.get<Subscription[]>('/subscriptions/upcoming')
    return response.data
  }
}

export const marketplaceService = {
  getAll: async (): Promise<MarketplaceItem[]> => {
    const response = await api.get<MarketplaceItem[]>('/marketplace')
    return response.data
  },
  
  getById: async (id: string): Promise<MarketplaceItem> => {
    const response = await api.get<MarketplaceItem>(`/marketplace/${id}`)
    return response.data
  },
  
  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>('/marketplace/categories')
    return response.data
  },
  
  getFeatured: async (): Promise<MarketplaceItem[]> => {
    const response = await api.get<MarketplaceItem[]>('/marketplace/featured')
    return response.data
  },
  
  getPopular: async (): Promise<MarketplaceItem[]> => {
    const response = await api.get<MarketplaceItem[]>('/marketplace/popular')
    return response.data
  },
  
  search: async (query: string): Promise<MarketplaceItem[]> => {
    const response = await api.get<MarketplaceItem[]>('/marketplace/search', {
      params: { q: query }
    })
    return response.data
  }
}
