import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ROUTES } from '@/lib/routes'

const plans = [
  {
    name: 'Starter',
    price: '₦0',
    period: '/month',
    description: 'For small shops starting digital operations.',
    cta: 'Start Free',
    href: ROUTES.AUTH.REGISTER,
    highlighted: false,
    features: ['Digital storefront', 'Order capture', 'Basic analytics', 'WhatsApp notifications'],
  },
  {
    name: 'Growth',
    price: '₦15,000',
    period: '/month',
    description: 'For growing MSMEs managing higher transaction volume.',
    cta: 'Choose Growth',
    href: ROUTES.AUTH.REGISTER,
    highlighted: true,
    features: ['Everything in Starter', 'Payments + reconciliation', 'Delivery tracking', 'Priority support'],
  },
  {
    name: 'Scale',
    price: 'Custom',
    period: '',
    description: 'For larger operations needing deeper controls.',
    cta: 'Request Access',
    href: ROUTES.AUTH.REGISTER,
    highlighted: false,
    features: ['Advanced analytics', 'Team access controls', 'Custom workflows', 'Dedicated onboarding'],
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16">
        <section className="mb-14 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Pricing Built for Nigerian MSMEs</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Choose a plan that matches your business stage and transaction needs.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border p-6 shadow-sm ${
                plan.highlighted ? 'border-green-500 bg-green-50/60' : 'border-gray-200 bg-white'
              }`}
            >
              <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
              <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
              <p className="mt-5 text-4xl font-bold text-gray-900">
                {plan.price}
                <span className="ml-1 text-base font-medium text-gray-500">{plan.period}</span>
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`mt-7 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
