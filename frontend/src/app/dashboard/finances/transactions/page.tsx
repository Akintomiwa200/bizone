import TransactionList from '@/components/finances/TransactionList'
import RevenueChart from '@/components/finances/RevenueChart'

export default function TransactionsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Transactions</h1>
        <p className="text-sm text-gray-500">Realtime ledger for payments, payouts, refunds, and expenses.</p>
      </header>

      <RevenueChart />
      <TransactionList />
    </div>
  )
}

