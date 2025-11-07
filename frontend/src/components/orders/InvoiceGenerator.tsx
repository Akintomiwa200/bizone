import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { invoiceSummaries } from '@/utils/mock-data'
import { FileText, Send } from 'lucide-react'

export default function InvoiceGenerator() {
  const nextInvoice = invoiceSummaries[2]

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          Invoice generator
        </CardTitle>
        <CardDescription>Auto-generate PDF invoices synced to customer wallets and emails.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-gray-600">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Next invoice number</p>
          <p className="text-base font-semibold text-gray-900">{nextInvoice.id}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Business</p>
            <p>{nextInvoice.business}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Due date</p>
            <p>{nextInvoice.dueDate}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Amount</p>
            <p>{nextInvoice.currency} {nextInvoice.amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Status</p>
            <p>{nextInvoice.status}</p>
          </div>
        </div>
        <p className="text-xs text-gray-400">
          Add your business banking details and brand colors in Bizone Settings to customize invoice templates.
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3 border-t border-gray-100 bg-gray-50/60">
        <Button variant="outline" className="border-gray-200 text-gray-700" size="sm">
          Preview PDF
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
          <Send className="h-4 w-4 mr-2" />
          Send invoice
        </Button>
      </CardFooter>
    </Card>
  )
}

