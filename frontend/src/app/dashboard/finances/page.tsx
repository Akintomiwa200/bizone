import RevenueChart from '@/components/finances/RevenueChart'
import TransactionList from '@/components/finances/TransactionList'
import ExpenseTracker from '@/components/finances/ExpenseTracker'
import LoanCalculator from '@/components/finances/LoanCalculator'

export default function FinancesOverviewPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Financial Overview</h1>
        <p className="text-sm text-gray-500">Stay on top of settlements, expenses, and working capital from a single dashboard.</p>
      </header>

      <RevenueChart />

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <LoanCalculator />
        <TransactionList />
      </div>

      <ExpenseTracker />
    </div>
  )
}

