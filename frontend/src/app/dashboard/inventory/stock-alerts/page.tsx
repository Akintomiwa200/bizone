import StockAlert from '@/components/business/StockAlert'
import InventoryAnalytics from '@/components/analytics/InventoryAnalytics'

export default function StockAlertsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Stock Alerts</h1>
        <p className="text-sm text-gray-500">AI-driven replenishment signals to prevent stockouts and oversupply.</p>
      </header>

      <StockAlert />
      <InventoryAnalytics />
    </div>
  )
}

