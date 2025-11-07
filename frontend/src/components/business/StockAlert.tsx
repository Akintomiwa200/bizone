import { stockAlerts } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { AlertTriangle, ArrowDownRight, ArrowUpRight } from 'lucide-react'

export default function StockAlert() {
  return (
    <Card className="border border-amber-100/70 shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-amber-600">
          <AlertTriangle className="h-5 w-5" />
          <CardTitle className="text-lg text-gray-900">Stock alerts</CardTitle>
        </div>
        <p className="text-sm text-gray-500">
          AI generated restock suggestions based on live sales velocity across all channels.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {stockAlerts.map((alert) => (
          <div
            key={alert.id}
            className="rounded-xl border border-amber-200 bg-amber-50/70 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{alert.product}</p>
                <p className="text-xs text-gray-500">Threshold {alert.threshold} units • Current {alert.current}</p>
              </div>
              <Badge variant="warning" className="text-amber-700">
                {alert.action}
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
              {alert.trend === 'down' ? (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              ) : (
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
              )}
              Demand trend {alert.trend === 'down' ? 'falling' : 'stable'}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

