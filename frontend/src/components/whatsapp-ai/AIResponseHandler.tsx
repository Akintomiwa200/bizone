import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Sparkles, BrainCircuit, Loader2 } from 'lucide-react'

const suggestions = [
  'Offer ₦1,000 voucher if customer completes purchase within 2 hours.',
  'Share rider details and estimated arrival with live tracking link.',
  'Upsell bundle pack with 12% discount—customer is a VIP tier member.'
]

export default function AIResponseHandler() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-emerald-500" />
          AI response engine
        </CardTitle>
        <CardDescription>AI analyzes tone, intent, and business rules to suggest the best reply.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Context understanding in progress
          </div>
          <p className="text-xs text-gray-600">Evaluating customer sentiment, last orders, and SLA commitments.</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wide">
            <Sparkles className="h-4 w-4" />
            Suggested responses
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="rounded-lg border border-gray-100 bg-white p-3">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

