import Chart from '@/components/ui/Chart'
import { analyticsTimeSeries } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export default function RevenueChart() {
  const chartData = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [
      {
        label: 'Revenue (₦ Millions)',
        data: analyticsTimeSeries.revenue,
        borderColor: '#2563eb',
        backgroundColor: '#bfdbfe'
      },
      {
        label: 'Orders',
        data: analyticsTimeSeries.orders,
        borderColor: '#22c55e',
        backgroundColor: '#bbf7d0'
      }
    ]
  }

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-gray-900">Revenue performance</CardTitle>
          <Badge variant="secondary">Last 7 months</Badge>
        </div>
        <CardDescription>
          Track gross merchandise value, order velocity, and customer acquisition trends.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Chart data={chartData} type="line" />
      </CardContent>
    </Card>
  )
}

