import BusinessForm from '@/components/business/BusinessForm'
import PaymentForm from '@/components/finances/PaymentForm'
import StockAlert from '@/components/business/StockAlert'

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Update business profile, communication defaults, and payment preferences.</p>
      </header>

      <BusinessForm />
      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
        <StockAlert />
        <PaymentForm />
      </div>
    </div>
  )
}

