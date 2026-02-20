import { format, parseISO, differenceInDays } from 'date-fns'

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}

export function formatDate(date: string | Date, formatStr: string = 'MMM d, yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr)
}

export function getDaysUntilRenewal(nextRenewal: string): number {
  return differenceInDays(parseISO(nextRenewal), new Date())
}

export function getRenewalStatus(daysUntil: number): 'urgent' | 'soon' | 'normal' {
  if (daysUntil <= 3) return 'urgent'
  if (daysUntil <= 7) return 'soon'
  return 'normal'
}

export function getBillingCycleLabel(cycle: string): string {
  const labels: Record<string, string> = {
    monthly: 'Monthly',
    yearly: 'Yearly',
    quarterly: 'Quarterly',
    weekly: 'Weekly'
  }
  return labels[cycle] || cycle
}

export const categories = [
  'Entertainment',
  'Productivity',
  'Utilities',
  'Health & Fitness',
  'Education',
  'Finance',
  'Social',
  'News',
  'Shopping',
  'Other'
]
