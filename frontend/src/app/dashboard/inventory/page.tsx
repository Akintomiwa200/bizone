import InventoryTable from '@/components/business/InventoryTable'
import InventoryAnalytics from '@/components/analytics/InventoryAnalytics'
import StockAlert from '@/components/business/StockAlert'

export default function InventoryPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Inventory Control</h1>
        <p className="text-sm text-gray-500">Keep stock synchronized across warehouses, storefronts, and WhatsApp commerce.</p>
      </header>

      <InventoryAnalytics />
      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
        <StockAlert />
        <InventoryTable />
      </div>
    </div>
  )
}

