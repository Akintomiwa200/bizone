import { aiInsights } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Route, Sparkles, ArrowRight } from 'lucide-react'

export default function RouteOptimizer() {
  const optimizationInsights = aiInsights.filter((insight) => insight.title.toLowerCase().includes('delivery') || insight.title.toLowerCase().includes('inventory'))

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader className="flex items-start justify-between gap-3">
        <div>
          <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
            <Route className="h-5 w-5 text-purple-500" />
            Smart route optimization
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            AI recommendations to reduce delivery time, fuel consumption, and rider idle hours.
          </CardDescription>
        </div>
        <Badge variant="secondary">Powered by Bizone AI</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {optimizationInsights.map((insight) => (
          <div key={insight.id} className="rounded-xl border border-purple-100 bg-purple-50/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-purple-700">
              <Sparkles className="h-4 w-4" />
              {insight.title}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{insight.insight}</p>
            <div className="text-xs font-semibold text-gray-500 flex items-center gap-2">
              <ArrowRight className="h-3.5 w-3.5" />
              {insight.impact}
            </div>
          </div>
        ))}
        <p className="text-xs text-gray-400">
          Integrate with Google Maps Directions API to automatically push optimized turn-by-turn navigation to rider devices.
        </p>
      </CardContent>
    </Card>
  )
}

