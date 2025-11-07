import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { analyticsHighlights } from '@/utils/mock-data'
import { FileBarChart, Sparkles } from 'lucide-react'

export default function ReportGenerator() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <FileBarChart className="h-5 w-5 text-blue-500" />
          Intelligent report builder
        </CardTitle>
        <CardDescription>Export AI-curated summaries for investors, lenders, and team reviews.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-gray-600">
        <p>Select data sources:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>Commerce performance (orders, revenue, abandoned carts)</li>
          <li>Customer analytics (retention, cohorts, NPS)</li>
          <li>Financial health (cash flow, settlements, expenses)</li>
        </ul>

        <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
            <Sparkles className="h-4 w-4" />
            AI recommendations for this report
          </div>
          {analyticsHighlights.slice(0, 2).map((highlight) => (
            <p key={highlight.title} className="text-xs text-gray-600">
              • {highlight.title}: {highlight.description}
            </p>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3 border-t border-gray-100 bg-gray-50/60">
        <Button variant="outline" className="border-gray-200 text-gray-700" size="sm">
          Preview report
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
          Export PDF
        </Button>
      </CardFooter>
    </Card>
  )
}

