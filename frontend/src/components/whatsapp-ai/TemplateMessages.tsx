import { whatsappTemplates } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Copy } from 'lucide-react'

export default function TemplateMessages() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Template library</CardTitle>
        <CardDescription>Approved WhatsApp templates ready to deploy.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {whatsappTemplates.map((template) => (
          <div key={template.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{template.name}</p>
                <p className="text-xs text-gray-500">{template.category.toUpperCase()} • {template.language}</p>
              </div>
              <Badge variant={template.status === 'approved' ? 'success' : template.status === 'pending' ? 'warning' : 'error'}>
                {template.status}
              </Badge>
            </div>
            <div className="text-xs text-gray-500">Used {template.usageCount} times • Last used {template.lastUsed}</div>
            <Button size="sm" variant="outline" className="border-gray-200 text-gray-700">
              <Copy className="h-4 w-4 mr-2" />
              Copy template
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

