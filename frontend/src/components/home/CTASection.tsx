"use client"

import { ArrowRight, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { ROUTES } from '@/lib/routes'

const CTASection = () => {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 py-20">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '34px 34px',
          }}
        />
      </div>

      <div className="relative container mx-auto max-w-5xl px-4 text-center">
        <p className="mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/15 px-4 py-2 text-sm font-semibold text-white">
          <MessageCircle className="mr-2 h-4 w-4" />
          Built for transaction-heavy teams
        </p>
        <h2 className="mb-5 text-4xl font-bold text-white md:text-5xl">
          Start running orders, payments, and delivery in one system
        </h2>
        <p className="mx-auto mb-9 max-w-3xl text-lg text-emerald-50">
          Replace scattered chats, manual confirmations, and delayed settlements with one connected Bizone workflow.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-white px-8 font-semibold text-emerald-700 hover:bg-emerald-50"
            onClick={() => router.push(ROUTES.AUTH.REGISTER)}
          >
            Create Free Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white bg-transparent px-8 font-semibold text-white hover:bg-white/15"
            onClick={() => router.push(ROUTES.PRICING)}
          >
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTASection
