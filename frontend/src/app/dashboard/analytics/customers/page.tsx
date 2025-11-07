import CustomerInsights from '@/components/analytics/CustomerInsights'
import CustomerSegmentation from '@/components/customers/CustomerSegmentation'
import CommunicationHistory from '@/components/customers/CommunicationHistory'

export default function CustomerAnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Customer Analytics</h1>
        <p className="text-sm text-gray-500">Track cohorts, loyalty, and omnichannel engagement over time.</p>
      </header>

      <CustomerInsights />
      <CustomerSegmentation />
      <CommunicationHistory />
    </div>
  )
}

