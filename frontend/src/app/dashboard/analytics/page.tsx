import DashboardStats from '@/components/analytics/DashboardStats'
import SalesChart from '@/components/analytics/SalesChart'
import CustomerInsights from '@/components/analytics/CustomerInsights'
import InventoryAnalytics from '@/components/analytics/InventoryAnalytics'

export default function AnalyticsOverviewPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Analytics Overview</h1>
        <p className="text-sm text-gray-500">Predict growth, track retention, and optimize operations with Bizone insights.</p>
      </header>

      <DashboardStats />
      <SalesChart />
      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <CustomerInsights />
        <InventoryAnalytics />
      </div>
    </div>
  )
}

