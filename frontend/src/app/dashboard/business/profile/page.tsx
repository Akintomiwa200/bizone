import BusinessProfile from '@/components/business/BusinessProfile'
import BusinessForm from '@/components/business/BusinessForm'
import BusinessCard from '@/components/business/BusinessCard'

export default function BusinessProfilePage() {
  return (
    <div className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-gray-900">Business Profile</h1>
        <p className="text-sm text-gray-500">Single source of truth for regulatory, branding, and customer-facing information.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
        <BusinessCard showActions={false} />
        <BusinessProfile />
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Update business info</h2>
        <BusinessForm />
      </section>
    </div>
  )
}

