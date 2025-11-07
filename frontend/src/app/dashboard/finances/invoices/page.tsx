import InvoiceList from '@/components/finances/InvoiceList'
import PaymentForm from '@/components/finances/PaymentForm'

export default function InvoicesPage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Invoices</h1>
        <p className="text-sm text-gray-500">Track invoice lifecycle, payouts, and automated reminders.</p>
      </header>

      <InvoiceList />
      <PaymentForm />
    </div>
  )
}

