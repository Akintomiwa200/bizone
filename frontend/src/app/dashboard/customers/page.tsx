import CustomerList from '@/components/customers/CustomerList'
import CustomerSegmentation from '@/components/customers/CustomerSegmentation'
import CommunicationHistory from '@/components/customers/CommunicationHistory'

export default function CustomersPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Customers</h1>
        <p className="text-sm text-gray-500">Understand your customers across segments, channels, and loyalty programs.</p>
      </header>

      <CustomerList />

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <CustomerSegmentation />
        <CommunicationHistory />
      </div>
    </div>
  )
}

