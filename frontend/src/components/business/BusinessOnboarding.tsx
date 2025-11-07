import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { CheckCircle2, Circle, ArrowRight, Link2, Sparkles } from 'lucide-react'

interface OnboardingStep {
  id: number
  title: string
  description: string
  status: 'completed' | 'current' | 'todo'
  helper: string
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Verify business information',
    description: 'Upload CAC document, BVN, and utility bill to unlock financial tools.',
    status: 'completed',
    helper: 'Documents verified on 4 Nov, 2025'
  },
  {
    id: 2,
    title: 'Set up online storefront',
    description: 'Customize branding, product catalog, currency, and checkout automations.',
    status: 'current',
    helper: 'AI will suggest a conversion-optimized layout once you add 5 products.'
  },
  {
    id: 3,
    title: 'Connect payment & logistics',
    description: 'Enable transfers, card payments, and assign delivery partners by region.',
    status: 'todo',
    helper: 'Integrate Paystack, Flutterwave, or Bizone Payments in a few clicks.'
  },
  {
    id: 4,
    title: 'Launch engagement automations',
    description: 'Activate WhatsApp journeys, abandoned cart flows, and loyalty programs.',
    status: 'todo',
    helper: 'Recommended after your first 50 orders to unlock AI personalization.'
  }
]

const statusIconMap = {
  completed: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
  current: <Sparkles className="h-5 w-5 text-blue-500" />,
  todo: <Circle className="h-5 w-5 text-gray-300" />
}

export default function BusinessOnboarding() {
  return (
    <Card className="h-full border border-purple-100/60 shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <Badge variant="secondary" className="w-fit bg-purple-100 text-purple-700">
          72% completed
        </Badge>
        <CardTitle className="text-2xl text-gray-900">
          Launch checklist
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Track your end-to-end onboarding progress and unlock Bizone premium features as you complete each milestone.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-5">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {statusIconMap[step.status]}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-gray-900">
                      Step {step.id}: {step.title}
                    </h3>
                    {step.status === 'current' && (
                      <Badge variant="primary" className="bg-blue-100 text-blue-700">
                        In progress
                      </Badge>
                    )}
                    {step.status === 'completed' && (
                      <Badge variant="success">Completed</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {step.helper}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-dashed border-purple-200 bg-purple-50/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-purple-700">
            <Link2 className="h-5 w-5" />
            <span>
              Connect your WhatsApp Business API to sync contacts & campaign analytics in real time.
            </span>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="sm">
            Continue setup
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

