import { customerSummaries, CustomerSummary, loyaltyPrograms } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { MessageCircle, Clock, MapPin, Wallet, Gift } from 'lucide-react'

interface CustomerProfileProps {
  customer?: CustomerSummary
}

export default function CustomerProfile({ customer = customerSummaries[0] }: CustomerProfileProps) {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader className="flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <div className={`h-12 w-12 rounded-full ${customer.avatarColor} text-white font-semibold flex items-center justify-center text-lg`}>
            {customer.name
              .split(' ')
              .map((word) => word[0])
              .join('')}
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl text-gray-900">{customer.name}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Loyal customer engaged across storefront, WhatsApp, and in-store purchases.
            </CardDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="warning">VIP tier</Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />
                Prefers WhatsApp
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Customer lifetime value</h3>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Total spend</p>
                  <p className="text-xl font-semibold text-gray-900">₦{customer.totalSpend.toLocaleString()}</p>
                </div>
                <Badge variant="success">+26.4% YoY</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  Last purchase {customer.lastPurchase}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {customer.location}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Loyalty & rewards</h3>
            <div className="rounded-lg border border-blue-100 bg-blue-50/70 p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <Gift className="h-4 w-4" />
                {customer.loyaltyPoints} loyalty points
              </div>
              <div className="text-xs text-gray-500">
                Redeemed 12 offers in the last quarter. Eligible for 
                {loyaltyPrograms[0]?.name ? ` ${loyaltyPrograms[0].name}` : ' loyalty boost'} bonus.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Engagement history
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>
              <div>
                <p className="font-medium text-gray-900">WhatsApp automation conversion</p>
                <p className="text-xs text-gray-500">Triggered purchase via Abandoned Cart flow • 6 hours ago</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
              <div>
                <p className="font-medium text-gray-900">In-store pickup completed</p>
                <p className="text-xs text-gray-500">POS terminal at Lagos flagship • 3 days ago</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-amber-500"></span>
              <div>
                <p className="font-medium text-gray-900">NPS feedback recorded</p>
                <p className="text-xs text-gray-500">Rated 9/10 citing fast delivery to Lekki Phase 1.</p>
              </div>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

