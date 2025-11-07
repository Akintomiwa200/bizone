import { CustomerSummary } from '@/utils/mock-data'
import { Card, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { MapPin, Wallet, Timer, Star } from 'lucide-react'

interface CustomerCardProps {
  customer: CustomerSummary
}

const tierColor: Record<CustomerSummary['tier'], { label: string; variant: Parameters<typeof Badge>[0]['variant'] }> = {
  new: { label: 'New customer', variant: 'primary' },
  active: { label: 'Active', variant: 'success' },
  vip: { label: 'VIP', variant: 'warning' },
  inactive: { label: 'At-risk', variant: 'error' }
}

export default function CustomerCard({ customer }: CustomerCardProps) {
  const tier = tierColor[customer.tier]

  return (
    <Card className="h-full border border-gray-200/70 shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full ${customer.avatarColor} text-white font-semibold flex items-center justify-center`}>
              {customer.name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{customer.name}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {customer.location}
              </p>
            </div>
          </div>
          <Badge variant={tier.variant}>{tier.label}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
              <Wallet className="h-3.5 w-3.5" />
              Total spend
            </p>
            <p className="text-base font-semibold text-gray-900">₦{customer.totalSpend.toLocaleString()}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide">
              <Timer className="h-3.5 w-3.5" />
              Last purchase
            </p>
            <p className="text-base font-semibold text-gray-900">{customer.lastPurchase}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            Loyalty points {customer.loyaltyPoints}
          </div>
          <div className="flex gap-2 flex-wrap">
            {customer.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-md bg-gray-100 text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

