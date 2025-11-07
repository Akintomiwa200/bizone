import LoanCalculator from '@/components/finances/LoanCalculator'
import TransactionList from '@/components/finances/TransactionList'

export default function LoansPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Bizone Capital</h1>
        <p className="text-sm text-gray-500">Model working capital offers, track repayments, and plan disbursements.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <LoanCalculator />
        <TransactionList />
      </div>
    </div>
  )
}

