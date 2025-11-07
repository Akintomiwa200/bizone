import InventoryAnalytics from '@/components/analytics/InventoryAnalytics'
import InventoryTable from '@/components/business/InventoryTable'
import StockAlert from '@/components/business/StockAlert'

export default function InventoryAnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Inventory Analytics</h1>
        <p className="text-sm text-gray-500">Balance stock levels with AI demand signals and replenishment alerts.</p>
      </header>

      <InventoryAnalytics />
      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
        <StockAlert />
        <InventoryTable />
      </div>
    </div>
  )
}

