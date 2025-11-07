import { analyticsHighlights, customerSummaries } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Users, Sparkles } from 'lucide-react'

export default function CustomerInsights() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader className="flex items-start justify-between gap-3">
        <div>
          <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            Customer insights
          </CardTitle>
          <CardDescription>
            Understand retention, engagement, and growth opportunities across segments.
          </CardDescription>
        </div>
        <Badge variant="secondary">Live cohort analysis</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analyticsHighlights.map((highlight) => (
            <div key={highlight.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2">
              <div className="text-sm font-semibold text-gray-900">{highlight.title}</div>
              <div className="text-2xl font-bold text-gray-900">{highlight.value}</div>
              <div className={`text-xs ${highlight.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                {highlight.change > 0 ? '+' : ''}{highlight.change}% vs last cycle
              </div>
              <p className="text-xs text-gray-500">{highlight.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-purple-100 bg-purple-50/60 p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-700">
            <Sparkles className="h-4 w-4" />
            Top engaged customers
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
            {customerSummaries.slice(0, 3).map((customer) => (
              <div key={customer.id} className="rounded-lg border border-white bg-white/60 p-3">
                <p className="font-semibold text-gray-900">{customer.name}</p>
                <p className="text-xs text-gray-500">{customer.location}</p>
                <p className="text-xs text-gray-400 mt-2">Total spend ₦{customer.totalSpend.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

