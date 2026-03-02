"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  MessageCircle,
  ReceiptText,
  Truck,
  Wallet,
} from 'lucide-react'
import Button from '@/components/ui/Button'

type TxMessage = {
  id: number
  sender: 'you' | 'bizone'
  text: string
  time: string
}

const txMessages: TxMessage[] = [
  { id: 1, sender: 'you', text: 'Send ₦48,000 to Emeka Farm for 8 crates of tomatoes.', time: '10:02' },
  { id: 2, sender: 'bizone', text: 'Processing payment via Flutterwave. Confirming supplier + rider.', time: '10:02' },
  { id: 3, sender: 'bizone', text: 'Paid: Emeka Farm ✅\nRider escrow: ₦8,500 ✅\nOrder #BZ-3821 active.', time: '10:03' },
  { id: 4, sender: 'you', text: 'Share receipt with customer and track delivery.', time: '10:03' },
  { id: 5, sender: 'bizone', text: 'Receipt shared ✅\nRider: Tunde (ETA 28 mins) 🚚', time: '10:03' },
]

const pillars = [
  {
    icon: <Wallet className="h-5 w-5 text-emerald-600" />,
    title: 'Instant Business Payments',
    text: 'Pay suppliers, riders, and partners from chat while every transfer is recorded against an order.',
  },
  {
    icon: <ReceiptText className="h-5 w-5 text-blue-600" />,
    title: 'Auto Receipts & Reconciliation',
    text: 'Each transaction creates proof of payment and updates your books for cleaner daily operations.',
  },
  {
    icon: <Truck className="h-5 w-5 text-amber-600" />,
    title: 'Pay-to-Deliver Workflow',
    text: 'Release rider payouts only when delivery milestones are met and status updates are confirmed.',
  },
  {
    icon: <CreditCard className="h-5 w-5 text-violet-600" />,
    title: 'Credit-Ready Transaction History',
    text: 'Consistent payment activity strengthens your business profile for lending and growth support.',
  },
]

const FeaturesSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <MessageCircle className="h-4 w-4" />
            Transaction Flow in Chat
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Send, confirm, and settle business payments in one thread
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Bizone is not a generic money app. It is built for MSMEs to run orders, payments,
            delivery, and records together through WhatsApp-style workflows.
          </p>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">Bizone Pay Assistant</p>
                <p className="text-xs text-gray-500">Order + payment + delivery status</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Live
              </span>
            </div>

            <div className="space-y-3">
              {txMessages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'you'
                        ? 'rounded-br-md bg-emerald-500 text-white'
                        : 'rounded-bl-md border border-gray-200 bg-white text-gray-700'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <p className={`mt-2 text-[11px] ${msg.sender === 'you' ? 'text-emerald-100' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
              <BadgeCheck className="h-4 w-4" />
              Payment references, receipts, and delivery logs are tied to one order timeline.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index + 0.2 }}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
                  {pillar.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{pillar.text}</p>
              </motion.article>
            ))}

            <div className="pt-2">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                Start with Bizone Pay
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
