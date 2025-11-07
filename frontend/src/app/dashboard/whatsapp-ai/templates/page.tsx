import TemplateMessages from '@/components/whatsapp-ai/TemplateMessages'
import AIResponseHandler from '@/components/whatsapp-ai/AIResponseHandler'

export default function WhatsAppTemplatesPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Template Messages</h1>
        <p className="text-sm text-gray-500">Manage approved content and AI-enhanced responses for every use case.</p>
      </header>

      <TemplateMessages />
      <AIResponseHandler />
    </div>
  )
}

