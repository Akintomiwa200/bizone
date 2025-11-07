import ChatInterface from '@/components/whatsapp-ai/ChatInterface'
import ChatAnalytics from '@/components/whatsapp-ai/ChatAnalytics'
import AutomationRules from '@/components/whatsapp-ai/AutomationRules'

export default function WhatsAppAIDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">WhatsApp AI Workspace</h1>
        <p className="text-sm text-gray-500">Automate conversations, support agents, and increase conversion with Bizone AI.</p>
      </header>

      <ChatInterface />
      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <AutomationRules />
        <ChatAnalytics />
      </div>
    </div>
  )
}

