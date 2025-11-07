"use client"

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import { Calculator, Percent, HandCoins } from 'lucide-react'

const tenorOptions = [
  { value: '3', label: '3 months' },
  { value: '6', label: '6 months' },
  { value: '9', label: '9 months' },
  { value: '12', label: '12 months' }
]

const rateOptions = [
  { value: '4', label: '4% monthly' },
  { value: '3.5', label: '3.5% monthly' },
  { value: '3', label: '3% monthly' }
]

export default function LoanCalculator() {
  const [amount, setAmount] = useState(200000)
  const [tenor, setTenor] = useState(6)
  const [rate, setRate] = useState(3.5)

  const { totalRepayment, monthlyRepayment } = useMemo(() => {
    const totalInterest = amount * (rate / 100) * tenor
    const total = amount + totalInterest
    return {
      totalRepayment: total,
      monthlyRepayment: total / tenor
    }
  }, [amount, tenor, rate])

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-emerald-500" />
          Working capital estimator
        </CardTitle>
        <CardDescription>
          Understand credit offers available via Bizone Capital and embedded partners.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Loan amount"
            type="number"
            min={50000}
            step={50000}
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
          />
          <Select
            label="Tenor"
            value={tenor.toString()}
            onChange={(event) => setTenor(Number(event.target.value))}
            options={tenorOptions}
          />
          <Select
            label="Monthly interest"
            value={rate.toString()}
            onChange={(event) => setRate(Number(event.target.value))}
            options={rateOptions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-900">Monthly repayment</div>
              <Badge variant="success">Auto debit</Badge>
            </div>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              ₦{monthlyRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-gray-500">
              Spread evenly across {tenor} months. Early repayment reduces interest.
            </p>
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Percent className="h-4 w-4" />
              Total repayment
            </div>
            <p className="text-xl font-semibold text-gray-900">
              ₦{totalRepayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-gray-500">Includes ₦{(totalRepayment - amount).toLocaleString()} interest over tenor.</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-xs text-gray-500 flex items-center gap-3">
          <HandCoins className="h-4 w-4 text-emerald-500" />
          Approval timeline currently 24 hours for verified Bizone businesses. Connect bank statements for faster decisions.
        </div>
      </CardContent>
    </Card>
  )
}

