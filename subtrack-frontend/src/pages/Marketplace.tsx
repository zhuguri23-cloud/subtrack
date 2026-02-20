import { useEffect, useState } from 'react'
import { ExternalLink, Plus } from 'lucide-react'
import { Card, CardContent } from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'
import { Input, Select } from '../components/Input'
import { marketplaceService } from '../services/subscription'
import type { MarketplaceItem } from '../types'
import { formatCurrency, categories } from '../utils/formatters'

export default function Marketplace() {
  const [items, setItems] = useState<MarketplaceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [, setSelectedItem] = useState<MarketplaceItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Entertainment',
    cost: 0,
    currency: 'USD',
    billingCycle: 'monthly' as const,
    startDate: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      const data = await marketplaceService.getAll()
      setItems(data)
    } catch (error) {
      console.error('Failed to load marketplace:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddFromMarketplace = (item: MarketplaceItem) => {
    setSelectedItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      cost: item.startingPrice,
      currency: 'USD',
      billingCycle: 'monthly',
      startDate: new Date().toISOString().split('T')[0]
    })
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Marketplace</h1>
        <p className="text-slate-500 mt-1">Discover popular subscription services</p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-slate-600">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-slate-900 mb-1">{item.name}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-slate-900">
                      {formatCurrency(item.startingPrice)}
                    </span>
                    <span className="text-sm text-slate-500">/mo</span>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(item.websiteUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Visit
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleAddFromMarketplace(item)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-16">
            <p className="text-slate-500">No marketplace items available</p>
          </CardContent>
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Subscription"
      >
        <form onSubmit={(e) => {
          e.preventDefault()
          setIsModalOpen(false)
        }}>
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              Add Subscription
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
