import CustomerSegmentation from '@/components/customers/CustomerSegmentation'
import CommunicationHistory from '@/components/customers/CommunicationHistory'

export default function CustomerGroupsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Customer Groups</h1>
        <p className="text-sm text-gray-500">Organize campaigns using AI-personalized cohorts and loyalty programs.</p>
      </header>

      <CustomerSegmentation />
      <CommunicationHistory />
    </div>
  )
}

