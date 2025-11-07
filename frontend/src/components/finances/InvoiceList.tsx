import { invoiceSummaries } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'

export default function InvoiceList() {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="text-lg text-gray-900">Outstanding invoices</CardTitle>
        <CardDescription>Track billing status and trigger reminders in one click.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoiceSummaries.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-semibold text-gray-900">{invoice.id}</TableCell>
                <TableCell>{invoice.business}</TableCell>
                <TableCell className="text-sm text-gray-500">{invoice.dueDate}</TableCell>
                <TableCell>
                  {invoice.currency} {invoice.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={invoice.status === 'paid' ? 'success' : invoice.status === 'overdue' ? 'error' : 'secondary'}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-700">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Total expected this month: ₦{invoiceSummaries.reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}</span>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            Send reminders
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

