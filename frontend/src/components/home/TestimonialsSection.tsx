"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageSquareQuote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Ifeoma N.',
    role: 'Retail buyer, Abuja',
    quote: 'I no longer chase screenshots for payment proof. Every order, transfer, and delivery update is in one place.',
  },
  {
    name: 'Suleiman A.',
    role: 'Farm supplier, Kaduna',
    quote: 'Once I confirm stock in chat, payout tracking is clear. It has reduced disputes and delayed settlements.',
  },
  {
    name: 'Tunde O.',
    role: 'Rider coordinator, Lagos',
    quote: 'Dispatch and rider payout are now linked to delivery milestones, so operations are cleaner and faster.',
  },
]

const TestimonialsSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-white to-emerald-50/40 py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            User Feedback
          </p>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Teams use Bizone to reduce friction in daily transactions
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Practical outcomes from merchants, suppliers, and logistics operators.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 * index }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                  <MessageSquareQuote className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-gray-700">"{item.quote}"</p>
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
