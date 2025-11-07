import Chart from '@/components/ui/Chart'
import { analyticsTimeSeries } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'

export default function SalesChart() {
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
    datasets: [
      {
        label: 'Orders',
        data: analyticsTimeSeries.orders,
        backgroundColor: '#60a5fa'
      }
    ]
  }

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Weekly order volume</CardTitle>
        <CardDescription>Monitor order spikes to plan logistics and inventory.</CardDescription>
      </CardHeader>
      <CardContent>
        <Chart data={chartData} type="bar" />
      </CardContent>
    </Card>
  )
}

