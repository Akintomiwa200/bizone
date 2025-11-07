  import BusinessCard from '@/components/business/BusinessCard'
import BusinessOnboarding from '@/components/business/BusinessOnboarding'
import BusinessForm from '@/components/business/BusinessForm'
import InventoryTable from '@/components/business/InventoryTable'
import StockAlert from '@/components/business/StockAlert'
import CategoryManager from '@/components/business/CategoryManager'
import ProductGrid from '@/components/business/ProductGrid'

export default function BusinessOverviewPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Business Control Center</h1>
        <p className="text-sm text-gray-500">Manage storefront details, product catalog, and cross-channel operations in real time.</p>
      </header>

      <section className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <div className="space-y-6">
          <BusinessCard />
          <BusinessOnboarding />
        </div>
        <BusinessForm />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
        <div className="space-y-6">
          <StockAlert />
          <CategoryManager />
        </div>
        <InventoryTable />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Featured products</h2>
          <p className="text-sm text-gray-500">Boost visibility of trending SKUs across Bizone channels.</p>
        </div>
        <ProductGrid />
      </section>
    </div>
  )
}

