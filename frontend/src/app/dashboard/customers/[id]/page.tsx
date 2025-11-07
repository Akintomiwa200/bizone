import CustomerProfile from '@/components/customers/CustomerProfile'
import CommunicationHistory from '@/components/customers/CommunicationHistory'

export default function CustomerDetailsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Customer Profile</h1>
        <p className="text-sm text-gray-500">360° view of customer engagement, spend, and sentiment across Bizone.</p>
      </header>

      <CustomerProfile />
      <CommunicationHistory />
    </div>
  )
}

