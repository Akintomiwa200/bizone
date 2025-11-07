import { whatsappAutomationStats } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { BarChart3, Timer, MessageSquare, Zap } from 'lucide-react'

export default function ChatAnalytics() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Conversation analytics</CardTitle>
        <CardDescription>Track WhatsApp campaign performance and team responsiveness.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            Campaigns sent
          </div>
          <p className="text-2xl font-semibold text-gray-900">{whatsappAutomationStats.campaignsSent}</p>
          <Badge variant="secondary">Last 30 days</Badge>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Zap className="h-5 w-5 text-emerald-500" />
            Active automations
          </div>
          <p className="text-2xl font-semibold text-gray-900">{whatsappAutomationStats.automationActive}</p>
          <p className="text-xs text-gray-500">Across sales, logistics, and support funnels.</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Timer className="h-5 w-5 text-purple-500" />
            Avg response time
          </div>
          <p className="text-2xl font-semibold text-gray-900">{whatsappAutomationStats.avgResponseTime}</p>
          <p className="text-xs text-gray-500">Automation handles 63% of first replies.</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MessageSquare className="h-5 w-5 text-amber-500" />
            Conversion rate
          </div>
          <p className="text-2xl font-semibold text-gray-900">{whatsappAutomationStats.conversionRate}%</p>
          <p className="text-xs text-gray-500">Triggered by abandoned cart recovery flows.</p>
        </div>
      </CardContent>
    </Card>
  )
}

