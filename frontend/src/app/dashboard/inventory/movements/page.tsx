import InventoryAnalytics from '@/components/analytics/InventoryAnalytics'
import InventoryTable from '@/components/business/InventoryTable'

export default function InventoryMovementsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Inventory Movements</h1>
        <p className="text-sm text-gray-500">Audit inbound restocks, outbound fulfilment, and adjustments.</p>
      </header>

      <InventoryAnalytics />
      <InventoryTable />
    </div>
  )
}

