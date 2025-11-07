"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { productSummaries, customerSummaries } from '@/utils/mock-data'
import { Loader2 } from 'lucide-react'

export default function CreateOrder() {
  const [customerId, setCustomerId] = useState(customerSummaries[0]?.id ?? '')
  const [productId, setProductId] = useState(productSummaries[0]?.id ?? '')
  const [quantity, setQuantity] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedProduct = productSummaries.find((product) => product.id === productId)
  const total = selectedProduct ? selectedProduct.price * quantity : 0

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Create manual order</CardTitle>
        <CardDescription>Process in-store or phone orders and sync inventory automatically.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardContent className="space-y-6">
          <Select
            label="Customer"
            value={customerId}
            onChange={(event) => setCustomerId(event.target.value)}
            options={customerSummaries.map((customer) => ({
              value: customer.id,
              label: `${customer.name} • ${customer.location}`
            }))}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Product"
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
              options={productSummaries.map((product) => ({ value: product.id, label: product.name }))}
            />
            <Input
              label="Quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
            <Input label="Discount (%)" type="number" min={0} max={100} defaultValue={0} />
          </div>

          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Logistics</span>
              <span>₦1,500</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-gray-900 mt-2">
              <span>Total</span>
              <span>₦{(total + 1500).toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Payment method"
              defaultValue="transfer"
              options={[
                { value: 'transfer', label: 'Bank transfer' },
                { value: 'card', label: 'Card (POS)' },
                { value: 'wallet', label: 'Bizone wallet' }
              ]}
            />
            <Select
              label="Fulfilment"
              defaultValue="delivery"
              options={[
                { value: 'delivery', label: 'Door delivery' },
                { value: 'pickup', label: 'Store pickup' },
                { value: 'digital', label: 'Digital product' }
              ]}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/60">
          <Button type="button" variant="outline" className="border-gray-300 text-gray-600">
            Save draft
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating order
              </>
            ) : (
              'Create order'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

