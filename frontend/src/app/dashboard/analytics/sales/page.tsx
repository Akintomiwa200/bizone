import SalesChart from '@/components/analytics/SalesChart'
import DashboardStats from '@/components/analytics/DashboardStats'
import ReportGenerator from '@/components/analytics/ReportGenerator'

export default function SalesAnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Sales Analytics</h1>
        <p className="text-sm text-gray-500">Identify demand trends, channel performance, and campaign ROI.</p>
      </header>

      <DashboardStats />
      <SalesChart />
      <ReportGenerator />
    </div>
  )
}

