import { transactionSummaries, TransactionSummary } from '@/utils/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import { ArrowDownCircle, ArrowUpCircle, RefreshCcw, CreditCard } from 'lucide-react'

interface TransactionListProps {
  transactions?: TransactionSummary[]
}

const iconForType = {
  payment: <ArrowDownCircle className="h-4 w-4 text-emerald-500" />,
  payout: <ArrowUpCircle className="h-4 w-4 text-blue-500" />,
  refund: <RefreshCcw className="h-4 w-4 text-amber-500" />,
  expense: <CreditCard className="h-4 w-4 text-gray-500" />
}

export default function TransactionList({ transactions = transactionSummaries }: TransactionListProps) {
  return (
    <Card className="border border-gray-200/70 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Recent transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium text-gray-900">{transaction.reference}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    {iconForType[transaction.type]}
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </div>
                </TableCell>
                <TableCell>₦{transaction.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={transaction.status === 'success' ? 'success' : transaction.status === 'pending' ? 'warning' : 'error'}>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className="capitalize">{transaction.channel.replace('-', ' ')}</TableCell>
                <TableCell className="text-sm text-gray-500">{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

