import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { ArrowRight, MessageCircle, ShoppingCart, CheckCircle2 } from 'lucide-react'

const flowSteps = [
  {
    id: 1,
    title: 'Welcome & qualification',
    description: 'AI greets customer, detects language preference, and captures intent.',
    icon: MessageCircle,
    color: 'text-blue-500'
  },
  {
    id: 2,
    title: 'Product recommendation',
    description: 'Suggest best-selling items based on previous purchase history.',
    icon: ShoppingCart,
    color: 'text-emerald-500'
  },
  {
    id: 3,
    title: 'Checkout & fulfillment',
    description: 'Generates payment link, confirms address, and books rider automatically.',
    icon: CheckCircle2,
    color: 'text-purple-500'
  }
]

export default function ConversationFlow() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Automation flow</CardTitle>
        <CardDescription>Visualize the AI journey customers experience on WhatsApp.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {flowSteps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={step.id} className="flex items-start gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 ${step.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index !== flowSteps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-gray-300" />
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

