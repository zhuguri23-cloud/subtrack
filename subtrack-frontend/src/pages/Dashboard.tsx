import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, TrendingUp, Calendar, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card'
import Button from '../components/Button'
import { subscriptionService } from '../services/subscription'
import type { SubscriptionStats } from '../types'
import { formatCurrency, getDaysUntilRenewal, getRenewalStatus } from '../utils/formatters'

export default function Dashboard() {
  const [stats, setStats] = useState<SubscriptionStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await subscriptionService.getStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of your subscriptions</p>
        </div>
        <Link to="/subscriptions">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Subscription
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Monthly Spending</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {formatCurrency(stats?.totalMonthly || 0)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Yearly Spending</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {formatCurrency(stats?.totalYearly || 0)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Active Subscriptions</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {stats?.activeCount || 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Renewals</CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.upcomingRenewals && stats.upcomingRenewals.length > 0 ? (
            <div className="space-y-4">
              {stats.upcomingRenewals.slice(0, 5).map((subscription) => {
                const daysUntil = getDaysUntilRenewal(subscription.nextRenewal)
                const status = getRenewalStatus(daysUntil)
                
                return (
                  <div key={subscription.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <span className="text-lg font-medium text-slate-600">
                          {subscription.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{subscription.name}</p>
                        <p className="text-sm text-slate-500">{subscription.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-900">
                        {formatCurrency(subscription.cost, subscription.currency)}
                      </p>
                      <p className={`text-sm ${
                        status === 'urgent' ? 'text-rose-600' :
                        status === 'soon' ? 'text-amber-600' :
                        'text-slate-500'
                      }`}>
                        {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-8">
              No upcoming renewals in the next 7 days
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
