"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { transactionSummaries } from '@/utils/mock-data'
import { ShieldCheck, Loader2 } from 'lucide-react'

const channels = [
  { value: 'card', label: 'Debit/Credit Card' },
  { value: 'transfer', label: 'Bank Transfer (NIP)' },
  { value: 'ussd', label: 'USSD' },
  { value: 'wallet', label: 'Bizone Wallet' }
]

export default function PaymentForm() {
  const [channel, setChannel] = useState('transfer')
  const [amount, setAmount] = useState(150000)
  const [reference] = useState(`BZN-${Date.now().toString().slice(-6)}`)
  const [isProcessing, setIsProcessing] = useState(false)

  const recentBeneficiary = transactionSummaries[0]

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Create payment link</CardTitle>
        <CardDescription>
          Generate one-time or recurring invoices. Customers can pay via card, transfer, or wallet.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Amount"
              type="number"
              min={1000}
              step={500}
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              required
            />
            <Select
              label="Payment channel"
              value={channel}
              onChange={(event) => setChannel(event.target.value)}
              options={channels}
            />
            <Input label="Reference" value={reference} readOnly />
            <Input label="Customer email" type="email" placeholder="customer@email.com" required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full min-h-[120px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe what the customer is paying for"
              defaultValue={`Subscription renewal for ${recentBeneficiary.narration}`}
            />
          </div>

          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-xs text-gray-500 flex items-start gap-3">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Payment links are PCI-DSS compliant with dynamic QR codes and automatic reconciliation.
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/60">
          <Button variant="outline" className="border-gray-300 text-gray-600" type="button">
            Save draft
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating link
              </>
            ) : (
              'Generate link'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

