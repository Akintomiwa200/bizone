import ChatAnalytics from '@/components/whatsapp-ai/ChatAnalytics'
import ReportGenerator from '@/components/analytics/ReportGenerator'
import ConversationFlow from '@/components/whatsapp-ai/ConversationFlow'

export default function WhatsAppAnalyticsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">WhatsApp Analytics</h1>
        <p className="text-sm text-gray-500">Measure messaging impact, campaign conversion, and agent efficiency.</p>
      </header>

      <ChatAnalytics />
      <ConversationFlow />
      <ReportGenerator />
    </div>
  )
}

