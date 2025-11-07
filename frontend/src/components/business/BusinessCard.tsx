import { BusinessSummary, businessSummaries } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Building2, MapPin, TrendingUp, ArrowRight } from 'lucide-react'

interface BusinessCardProps {
  business?: BusinessSummary
  showActions?: boolean
}

const statusVariant: Record<BusinessSummary['status'], 'success' | 'warning' | 'error'> = {
  active: 'success',
  pending: 'warning',
  suspended: 'error'
}

const stageCopy: Record<BusinessSummary['stage'], string> = {
  idea: 'Idea Stage',
  launch: 'Launching',
  growth: 'Growth Mode',
  scale: 'Scaling'
}

export default function BusinessCard({
  business = businessSummaries[0],
  showActions = true
}: BusinessCardProps) {
  const revenueMillions = (business.revenue / 1_000_000).toFixed(1)

  return (
    <Card className="h-full shadow-sm border border-blue-100/60">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              {business.name}
              <Badge variant={statusVariant[business.status]}>
                {business.status === 'active' ? 'Active' : business.status === 'pending' ? 'Pending' : 'Suspended'}
              </Badge>
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Owned by {business.owner}
            </CardDescription>
          </div>
        </div>
        <Badge variant="secondary">{stageCopy[business.stage]}</Badge>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Monthly Revenue</p>
            <div className="flex items-baseline gap-2 text-gray-900">
              <span className="text-2xl font-semibold">₦{revenueMillions}M</span>
              <div className="inline-flex items-center text-sm text-emerald-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.4%
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Category</p>
            <p className="text-base font-medium text-gray-900">{business.category}</p>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {business.location}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-blue-200 bg-blue-50/60 p-4">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Real-time Status
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Last synced</p>
              <p className="text-base font-medium text-gray-900">{business.lastActive}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-blue-700">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Connected to Bizone Cloud
            </div>
          </div>
        </div>

        {showActions && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            <div className="text-sm text-gray-500">
              Keep track of storefront performance, marketing automation, and payouts.
            </div>
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
              Manage Business
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

