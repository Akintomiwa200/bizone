import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Send, MessageCircle, ShieldCheck, Download } from 'lucide-react'

export default function OrderActions() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardContent className="p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Order actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Dispatch rider
          </Button>
          <Button variant="outline" className="border-gray-200 text-gray-700" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Notify customer
          </Button>
          <Button variant="outline" className="border-gray-200 text-gray-700" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download invoice
          </Button>
          <Button variant="outline" className="border-emerald-200 text-emerald-600" size="sm">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Mark as delivered
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

