import { BusinessSummary, businessSummaries, aiInsights } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Building2, Mail, MapPin, Phone, ShieldCheck, Clock, Sparkles } from 'lucide-react'

interface BusinessProfileProps {
  business?: BusinessSummary
}

const tierCopy: Record<BusinessSummary['stage'], string> = {
  idea: 'Founders Program',
  launch: 'Launchpad',
  growth: 'Growth Accelerator',
  scale: 'Enterprise'
}

export default function BusinessProfile({ business = businessSummaries[0] }: BusinessProfileProps) {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader className="flex flex-col gap-3">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
            <Building2 className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-2xl text-gray-900">
              {business.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Helping {business.category.toLowerCase()} businesses scale with Bizone
            </CardDescription>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="success">{tierCopy[business.stage]} tier</Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                KYC verified
              </Badge>
              <Badge variant="warning">Real-time sync</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Business details
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                {business.location}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                support@bizone.africa
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                +234 810 000 0000
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                Active • {business.lastActive}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Performance snapshot
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Monthly GMV</p>
                <p className="text-xl font-semibold text-gray-900">₦{(business.revenue / 1_000_000).toFixed(1)}M</p>
                <p className="text-xs text-emerald-600 mt-1">+18.4% this month</p>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Active customers</p>
                <p className="text-xl font-semibold text-gray-900">2,310</p>
                <p className="text-xs text-blue-600 mt-1">71% repeat rate</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            AI-powered insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-blue-600">
                  <Sparkles className="h-4 w-4" />
                  {insight.title}
                </div>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {insight.insight}
                </p>
                <p className="mt-3 text-xs font-semibold text-gray-500">
                  Impact: {insight.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

