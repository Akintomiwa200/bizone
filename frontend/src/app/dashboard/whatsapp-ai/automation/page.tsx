import AutomationRules from '@/components/whatsapp-ai/AutomationRules'
import ConversationFlow from '@/components/whatsapp-ai/ConversationFlow'

export default function WhatsAppAutomationPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Automation Builder</h1>
        <p className="text-sm text-gray-500">Design multi-step journeys combining AI replies, human hand-offs, and logistics triggers.</p>
      </header>

      <AutomationRules />
      <ConversationFlow />
    </div>
  )
}

