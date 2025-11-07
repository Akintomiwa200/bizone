import { analyticsHighlights } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Gauge, Timer, TrendingUp } from 'lucide-react'

export default function PerformanceMetrics() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Performance metrics</CardTitle>
        <CardDescription>Compare operational, financial, and growth KPIs.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Gauge className="h-5 w-5 text-blue-500" />
            NPS score
          </div>
          <p className="text-3xl font-semibold text-gray-900">64</p>
          <p className="text-xs text-gray-500">↑ improved by 6 points after faster deliveries.</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Timer className="h-5 w-5 text-emerald-500" />
            Average fulfilment time
          </div>
          <p className="text-3xl font-semibold text-gray-900">42m</p>
          <p className="text-xs text-gray-500">Across Lagos, Abuja, Kaduna dispatch zones.</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            Growth score
          </div>
          <p className="text-3xl font-semibold text-gray-900">88%</p>
          <p className="text-xs text-gray-500">AI predicts +14% uplift with multi-channel campaigns.</p>
        </div>
        {analyticsHighlights.map((highlight) => (
          <div key={highlight.title} className="rounded-xl border border-gray-100 bg-white p-4 space-y-2">
            <p className="text-sm font-semibold text-gray-900">{highlight.title}</p>
            <p className="text-xl font-semibold text-gray-900">{highlight.value}</p>
            <p className={`text-xs ${highlight.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
              {highlight.change > 0 ? '+' : ''}{highlight.change}% change
            </p>
            <p className="text-xs text-gray-500">{highlight.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

