import StockAlert from '@/components/business/StockAlert'
import CommunicationHistory from '@/components/customers/CommunicationHistory'

export default function NotificationSettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Notification Center</h1>
        <p className="text-sm text-gray-500">Control alerts across email, SMS, WhatsApp, and in-app channels.</p>
      </header>

      <StockAlert />
      <CommunicationHistory />
    </div>
  )
}

