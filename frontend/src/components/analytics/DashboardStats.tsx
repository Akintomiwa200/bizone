import { dashboardMetrics } from '@/utils/mock-data'
import { Card, CardContent } from '@/components/ui/Card'
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {dashboardMetrics.map((metric) => {
        const Icon = metric.trend === 'up' ? ArrowUpRight : metric.trend === 'down' ? ArrowDownRight : Minus
        const trendColor = metric.trend === 'up' ? 'text-emerald-600' : metric.trend === 'down' ? 'text-red-500' : 'text-gray-500'

        return (
          <Card key={metric.label} className="border border-gray-200/70 shadow-sm">
            <CardContent className="p-5 space-y-3">
              <p className="text-xs uppercase tracking-wide text-gray-500">{metric.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <div className={`flex items-center gap-2 text-sm ${trendColor}`}>
                <Icon className="h-4 w-4" />
                {metric.change}%
                <span className="text-gray-400">vs last month</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

