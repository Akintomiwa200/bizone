import { customerSummaries, CustomerSummary } from '@/utils/mock-data'
import CustomerCard from './CustomerCard'
import Input from '@/components/ui/Input'
import { useState } from 'react'
import { Users } from 'lucide-react'

interface CustomerListProps {
  customers?: CustomerSummary[]
}

export default function CustomerList({ customers = customerSummaries }: CustomerListProps) {
  const [search, setSearch] = useState('')

  const filtered = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Customers
          </h2>
          <p className="text-sm text-gray-500">Segmented insights and relationship history in real time.</p>
        </div>
        <Input
          placeholder="Search customers by name or location"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="md:w-72"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-sm text-gray-500">
            No customers match your search.
          </div>
        )}
      </div>
    </div>
  )
}

