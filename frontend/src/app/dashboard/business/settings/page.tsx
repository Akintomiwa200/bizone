import BusinessForm from '@/components/business/BusinessForm'
import CategoryManager from '@/components/business/CategoryManager'
import StockAlert from '@/components/business/StockAlert'

export default function BusinessSettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Business Settings</h1>
        <p className="text-sm text-gray-500">Configure storefront defaults, communication preferences, and catalog structure.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <div className="space-y-6">
          <StockAlert />
          <CategoryManager />
        </div>
        <BusinessForm />
      </div>
    </div>
  )
}

