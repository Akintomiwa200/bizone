import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Zap, Clock, Users } from 'lucide-react'

const rules = [
  {
    id: 'RULE-12',
    name: 'Abandoned cart recovery',
    trigger: 'No checkout after 45 mins',
    action: 'Send personalized offer with free delivery',
    status: 'active'
  },
  {
    id: 'RULE-09',
    name: 'New customer onboarding',
    trigger: 'Sign-up via storefront',
    action: 'Send welcome kit & how-to video',
    status: 'active'
  },
  {
    id: 'RULE-07',
    name: 'Delivery delay notice',
    trigger: 'Rider not moving for 10 mins',
    action: 'Notify customer & escalate to support',
    status: 'paused'
  }
]

export default function AutomationRules() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Automation rules</CardTitle>
        <CardDescription>Bizone AI orchestrates multi-step workflows across sales and support.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {rules.map((rule) => (
          <div key={rule.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-900">{rule.name}</div>
              <Badge variant={rule.status === 'active' ? 'success' : 'warning'}>{rule.status}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                Trigger — {rule.trigger}
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-500" />
                Action — {rule.action}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                Segments — Sales & Logistics
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

