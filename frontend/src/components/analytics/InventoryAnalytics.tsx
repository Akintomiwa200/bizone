import { inventoryMovements, stockAlerts } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { ArrowDownLeft, ArrowUpRight, AlertTriangle } from 'lucide-react'

export default function InventoryAnalytics() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Inventory analytics</CardTitle>
        <CardDescription>Monitor stock flows and AI-powered alerts across warehouses.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Movements</h3>
          <div className="space-y-3">
            {inventoryMovements.map((movement) => (
              <div key={movement.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{movement.item}</p>
                  <p className="text-xs text-gray-500">{movement.date}</p>
                </div>
                <Badge variant={movement.type === 'inbound' ? 'success' : movement.type === 'outbound' ? 'warning' : 'secondary'}>
                  {movement.type.toUpperCase()} • {movement.quantity}
                </Badge>
                <p className="text-xs text-gray-500">{movement.source}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Stock alerts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {stockAlerts.map((alert) => (
              <div key={alert.id} className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  {alert.product}
                </div>
                <p className="text-xs text-gray-500">Current {alert.current} • Threshold {alert.threshold}</p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  {alert.trend === 'down' ? <ArrowDownLeft className="h-4 w-4 text-red-500" /> : <ArrowUpRight className="h-4 w-4 text-emerald-500" />}
                  {alert.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

