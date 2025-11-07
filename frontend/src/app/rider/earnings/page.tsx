import LoanCalculator from '@/components/finances/LoanCalculator'
import TransactionList from '@/components/finances/TransactionList'
import RiderCard from '@/components/delivery/RiderCard'
import { riderPerformances } from '@/utils/mock-data'

export default function RiderEarningsPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Earnings & Payouts</h1>
        <p className="text-sm text-gray-500">Track weekly targets, withdraw balances, and access Bizone rider credit.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {riderPerformances.map((rider) => (
          <RiderCard key={rider.id} rider={rider} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <LoanCalculator />
        <TransactionList />
      </div>
    </div>
  )
}

