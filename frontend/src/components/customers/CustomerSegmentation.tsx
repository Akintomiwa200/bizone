import { loyaltyPrograms, regionalSalesDistribution } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { PieChart, Users } from 'lucide-react'

export default function CustomerSegmentation() {
  const totalMembers = loyaltyPrograms.reduce((total, program) => total + program.members, 0)

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <PieChart className="h-5 w-5 text-emerald-500" />
          Customer segmentation
        </CardTitle>
        <Badge variant="secondary">{totalMembers} members</Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Loyalty cohorts</h3>
            <ul className="space-y-3">
              {loyaltyPrograms.map((program) => (
                <li
                  key={program.id}
                  className="rounded-lg border border-gray-100 bg-gray-50 p-4 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{program.name}</p>
                    <p className="text-xs text-gray-500">
                      {program.members} members • {program.rewardsRedeemed} rewards redeemed
                    </p>
                  </div>
                  <Badge variant="success">+{program.uplift}% uplift</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Regional distribution</h3>
            <div className="space-y-3">
              {regionalSalesDistribution.map((region) => (
                <div key={region.region} className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Users className="h-4 w-4 text-emerald-500" />
                      {region.region}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{region.value}%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: `${region.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

