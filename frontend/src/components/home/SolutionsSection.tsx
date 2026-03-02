"use client"

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ShoppingCart, Tractor, Truck } from 'lucide-react'
import { ROUTES } from '@/lib/routes'

const solutions = [
  {
    title: 'For Buyers & Retail Teams',
    subtitle: 'Order operations',
    icon: <ShoppingCart className="h-5 w-5 text-blue-600" />,
    points: ['Place bulk orders in chat', 'Confirm availability instantly', 'Track receipts and status in one thread'],
  },
  {
    title: 'For Farmers & Suppliers',
    subtitle: 'Supply operations',
    icon: <Tractor className="h-5 w-5 text-emerald-600" />,
    points: ['Receive structured order requests', 'Confirm quantities and payout', 'Build transaction history for credit scoring'],
  },
  {
    title: 'For Riders & Dispatch Teams',
    subtitle: 'Delivery operations',
    icon: <Truck className="h-5 w-5 text-amber-600" />,
    points: ['Get assigned from active orders', 'Share live updates and ETA', 'Release payout on verified delivery milestones'],
  },
]

const SolutionsSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            Role-Based Workflows
          </p>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Solutions for every actor in the transaction chain
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Bizone supports the people who buy, supply, and deliver, without forcing them into complex tools.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <motion.article
              key={solution.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 * index }}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                {solution.icon}
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">{solution.subtitle}</p>
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">{solution.title}</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                {solution.points.map((point) => (
                  <li key={point} className="leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 text-center"
        >
          <Link
            href={ROUTES.SOLUTIONS}
            className="inline-flex items-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
          >
            Explore all solutions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionsSection
