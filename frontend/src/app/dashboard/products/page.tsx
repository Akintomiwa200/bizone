import ProductGrid from '@/components/business/ProductGrid'
import InventoryTable from '@/components/business/InventoryTable'
import StockAlert from '@/components/business/StockAlert'
import ProductForm from '@/components/business/ProductForm'

export default function ProductsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Products</h1>
        <p className="text-sm text-gray-500">Centralize catalog updates across storefront, POS, and WhatsApp Commerce.</p>
      </header>

      <section className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
        <div className="space-y-6">
          <StockAlert />
          <ProductForm />
        </div>
        <InventoryTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Featured listings</h2>
        <ProductGrid />
      </section>
    </div>
  )
}

