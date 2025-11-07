"use client"

import { useState } from 'react'
import Input from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { Filter, RotateCcw } from 'lucide-react'

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'completed', label: 'Completed' }
]

const fulfillmentOptions = [
  { value: 'all', label: 'All fulfilments' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'pickup', label: 'Pickup' },
  { value: 'digital', label: 'Digital' }
]

export function OrderFilters() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [fulfillment, setFulfillment] = useState('all')

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Filter className="h-4 w-4 text-blue-500" />
        Filter orders
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search by order ID or customer"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="md:col-span-2"
        />
        <Select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={statusOptions}
        />
        <Select
          value={fulfillment}
          onChange={(event) => setFulfillment(event.target.value)}
          options={fulfillmentOptions}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
          Apply filters
        </Button>
        <Button size="sm" variant="outline" className="border-gray-200 text-gray-600" onClick={() => {
          setQuery('')
          setStatus('all')
          setFulfillment('all')
        }}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
      <p className="text-xs text-gray-400">
        Orders update automatically from Bizone POS, storefront, WhatsApp commerce, and API integrations.
      </p>
    </div>
  )
}

