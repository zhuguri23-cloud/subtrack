import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { Card, CardContent } from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'
import { Input, Select } from '../components/Input'
import { subscriptionService } from '../services/subscription'
import type { Subscription, SubscriptionInput } from '../types'
import { formatCurrency, formatDate, categories } from '../utils/formatters'

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null)
  const [formData, setFormData] = useState<SubscriptionInput>({
    name: '',
    category: 'Entertainment',
    cost: 0,
    currency: 'USD',
    billingCycle: 'monthly',
    startDate: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    loadSubscriptions()
  }, [])

  const loadSubscriptions = async () => {
    try {
      const data = await subscriptionService.getAll()
      setSubscriptions(data)
    } catch (error) {
      console.error('Failed to load subscriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingSubscription) {
        await subscriptionService.update(editingSubscription.id, formData)
      } else {
        await subscriptionService.create(formData)
      }
      setIsModalOpen(false)
      setEditingSubscription(null)
      resetForm()
      loadSubscriptions()
    } catch (error) {
      console.error('Failed to save subscription:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return
    try {
      await subscriptionService.delete(id)
      loadSubscriptions()
    } catch (error) {
      console.error('Failed to delete subscription:', error)
    }
  }

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription)
    setFormData({
      name: subscription.name,
      category: subscription.category,
      cost: subscription.cost,
      currency: subscription.currency,
      billingCycle: subscription.billingCycle,
      startDate: subscription.startDate.split('T')[0]
    })
    setIsModalOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Entertainment',
      cost: 0,
      currency: 'USD',
      billingCycle: 'monthly',
      startDate: new Date().toISOString().split('T')[0]
    })
  }

  const openAddModal = () => {
    resetForm()
    setEditingSubscription(null)
    setIsModalOpen(true)
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
          <h1 className="text-2xl font-bold text-slate-900">Subscriptions</h1>
          <p className="text-slate-500 mt-1">Manage all your subscriptions</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="w-4 h-4 mr-2" />
          Add Subscription
        </Button>
      </div>

      {subscriptions.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Name</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Category</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Cost</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Billing</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">Next Renewal</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((subscription) => (
                    <tr key={subscription.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                            <span className="text-lg font-medium text-slate-600">
                              {subscription.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-slate-900">{subscription.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{subscription.category}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {formatCurrency(subscription.cost, subscription.currency)}
                      </td>
                      <td className="px-6 py-4 text-slate-600 capitalize">{subscription.billingCycle}</td>
                      <td className="px-6 py-4 text-slate-600">
                        {formatDate(subscription.nextRenewal)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(subscription)}
                            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(subscription.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-16">
            <p className="text-slate-500 mb-4">No subscriptions yet</p>
            <Button onClick={openAddModal}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Subscription
            </Button>
          </CardContent>
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSubscription ? 'Edit Subscription' : 'Add Subscription'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Netflix"
            required
          />
          
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={categories.map(c => ({ value: c, label: c }))}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              label="Cost"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
            
            <Select
              label="Currency"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'EUR', label: 'EUR' },
                { value: 'GBP', label: 'GBP' },
                { value: 'CNY', label: 'CNY' }
              ]}
            />
          </div>
          
          <Select
            label="Billing Cycle"
            value={formData.billingCycle}
            onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as any })}
            options={[
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' },
              { value: 'quarterly', label: 'Quarterly' },
              { value: 'yearly', label: 'Yearly' }
            ]}
          />
          
          <Input
            type="date"
            label="Start Date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
          
          <div className="flex gap-3 mt-6">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingSubscription ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
