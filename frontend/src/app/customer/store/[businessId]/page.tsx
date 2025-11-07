import ProductGrid from '@/components/business/ProductGrid'
import BusinessCard from '@/components/business/BusinessCard'
import CustomerList from '@/components/customers/CustomerList'

export default function CustomerStorefrontPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Storefront Preview</h1>
        <p className="text-sm text-gray-500">Browse featured products, reviews, and community activity for this business.</p>
      </header>

      <BusinessCard showActions={false} />
      <ProductGrid />
      <CustomerList />
    </div>
  )
}

