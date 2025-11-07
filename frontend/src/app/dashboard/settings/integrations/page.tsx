import AutomationRules from '@/components/whatsapp-ai/AutomationRules'
import DeliveryMap from '@/components/delivery/DeliveryMap'

export default function IntegrationSettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Integrations</h1>
        <p className="text-sm text-gray-500">Connect logistics, payments, marketing automation, and analytics tools.</p>
      </header>

      <AutomationRules />
      <DeliveryMap />
    </div>
  )
}

