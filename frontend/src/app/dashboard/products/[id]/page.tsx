import ProductCard from '@/components/business/ProductCard'
import InventoryTable from '@/components/business/InventoryTable'
import StockAlert from '@/components/business/StockAlert'

export default function ProductDetailsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Product Details</h1>
        <p className="text-sm text-gray-500">Deep dive into performance, inventory, and recommended actions.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
        <div className="space-y-6">
          <ProductCard />
          <StockAlert />
        </div>
        <InventoryTable />
      </div>
    </div>
  )
}

