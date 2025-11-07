import ProductForm from '@/components/business/ProductForm'
import StockAlert from '@/components/business/StockAlert'

export default function CreateProductPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Create Product</h1>
        <p className="text-sm text-gray-500">Publish a new product to your Bizone storefront and connected channels.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
        <StockAlert />
        <ProductForm />
      </div>
    </div>
  )
}

