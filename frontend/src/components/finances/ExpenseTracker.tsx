import { expenseSummaries } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import { Wallet } from 'lucide-react'

export default function ExpenseTracker() {
  const total = expenseSummaries.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <Wallet className="h-5 w-5 text-amber-500" />
          Expense tracker
        </CardTitle>
        <Badge variant="secondary">₦{total.toLocaleString()}</Badge>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment method</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenseSummaries.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium text-gray-900">{expense.category}</TableCell>
                <TableCell className="text-sm text-gray-600">{expense.description}</TableCell>
                <TableCell className="text-sm text-gray-500">{expense.date}</TableCell>
                <TableCell>{expense.paymentMethod}</TableCell>
                <TableCell>₦{expense.amount.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

