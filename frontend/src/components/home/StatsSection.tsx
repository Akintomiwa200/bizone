"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CreditCard, MessageCircle, Route, ShieldCheck } from 'lucide-react'

const stats = [
  {
    title: '18,400+',
    label: 'Orders coordinated',
    detail: 'From WhatsApp chats to confirmed deliveries.',
    icon: <MessageCircle className="h-5 w-5 text-emerald-600" />,
  },
  {
    title: '₦2.4M+',
    label: 'Daily transaction flow',
    detail: 'Supplier payouts, rider escrow, and customer receipts.',
    icon: <CreditCard className="h-5 w-5 text-blue-600" />,
  },
  {
    title: '36 states',
    label: 'Delivery reach',
    detail: 'Operational handoffs across Nigeria.',
    icon: <Route className="h-5 w-5 text-amber-600" />,
  },
  {
    title: '99.3%',
    label: 'Settlement reliability',
    detail: 'Consistent payment and reconciliation records.',
    icon: <ShieldCheck className="h-5 w-5 text-violet-600" />,
  },
]

const StatsSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-8 top-14 h-40 w-40 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute bottom-8 right-8 h-48 w-48 rounded-full bg-sky-100/60 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            MSME Operations Snapshot
          </p>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            One workflow from chat to cash to delivery
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Bizone connects commerce actions that are usually fragmented across multiple tools.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 * index }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
                {item.icon}
              </div>
              <p className="text-3xl font-bold text-gray-900">{item.title}</p>
              <p className="mt-2 text-sm font-semibold text-gray-800">{item.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
