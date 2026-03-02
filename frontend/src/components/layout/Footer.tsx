"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp, Leaf, Mail, MapPin, Phone } from 'lucide-react'
import { ROUTES } from '@/lib/routes'

const Footer = () => {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden bg-gray-950 text-white">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <section>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
                <Leaf className="h-4 w-4" />
              </div>
              <p className="text-xl font-bold">Bizone</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">
              Commerce and transaction infrastructure for Nigerian MSMEs using WhatsApp-first workflows.
            </p>
          </section>

          <section>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-200">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href={ROUTES.FEATURES} className="hover:text-white">Features</Link></li>
              <li><Link href={ROUTES.SOLUTIONS} className="hover:text-white">Solutions</Link></li>
              <li><Link href={ROUTES.PRICING} className="hover:text-white">Pricing</Link></li>
              <li><Link href={ROUTES.ABOUT} className="hover:text-white">About</Link></li>
            </ul>
          </section>

          <section>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-200">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href={ROUTES.AUTH.REGISTER} className="hover:text-white">Create Account</Link></li>
              <li><Link href={ROUTES.AUTH.LOGIN} className="hover:text-white">Sign In</Link></li>
              <li><Link href={ROUTES.DASHBOARD.OVERVIEW} className="hover:text-white">Dashboard</Link></li>
              <li><Link href={ROUTES.HELP} className="hover:text-white">Help</Link></li>
            </ul>
          </section>

          <section>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-200">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                Lagos, Nigeria
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400" />
                +234 801 234 5678
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400" />
                support@bizone.ng
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm text-gray-400 md:flex-row md:items-center">
          <p>© {year} Bizone. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href={ROUTES.ABOUT} className="hover:text-white">Privacy</Link>
            <Link href={ROUTES.ABOUT} className="hover:text-white">Terms</Link>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              className="inline-flex items-center rounded-lg border border-white/15 px-3 py-1.5 text-gray-200 hover:bg-white/10"
            >
              Top
              <ArrowUp className="ml-1 h-3.5 w-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
