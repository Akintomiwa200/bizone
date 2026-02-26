"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/lib/routes'
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Leaf } from 'lucide-react'
import { useRouter } from 'next/navigation'

/* ─────────────────────────────────────────
   Section colour map  (id → tailwind bg)
   Add/change these to match your sections.
───────────────────────────────────────── */
const SECTION_COLORS: Record<string, string> = {
  hero:      'bg-white',
  features:  'bg-gray-50',
  solutions: 'bg-green-50',
  pricing:   'bg-white',
  about:     'bg-emerald-900',   // example dark section
}

const DEFAULT_BG = 'bg-white'

/* ─────────────────────────────────────────
   Detect which section is in the viewport
───────────────────────────────────────── */
function useActiveSectionBg (): string {
  const [bg, setBg] = useState(DEFAULT_BG)

  useEffect(() => {
    const ids = Object.keys(SECTION_COLORS)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBg(SECTION_COLORS[entry.target.id] ?? DEFAULT_BG)
          }
        })
      },
      { threshold: 0.4 }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return bg
}

/* ─────────────────────────────────────────
   Header
───────────────────────────────────────── */
const Header = () => {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled]       = useState(false)
  const sectionBg                     = useActiveSectionBg()

  const { isAuthenticated, user, logout } = useAuth()
  const router = useRouter()

  /* Shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = [
    { name: 'Features',  href: '#features'  },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Pricing',   href: '#pricing'   },
    { name: 'About',     href: '#about'     },
  ]

  const go = (path: string) => {
    router.push(path)
    setMobileOpen(false)
    setUserMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    setUserMenuOpen(false)
    router.push(ROUTES.HOME)
  }

  /* Derive text colour from section background */
  const isDark = sectionBg.includes('emerald-900') || sectionBg.includes('gray-900')
  const textColor  = isDark ? 'text-white/90'  : 'text-gray-700'
  const hoverText  = isDark ? 'hover:text-white' : 'hover:text-green-600'
  const logoText   = isDark ? 'text-white'      : 'text-gray-900'

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${sectionBg}
        ${scrolled ? 'shadow-sm border-b border-black/5' : ''}
      `}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => go(ROUTES.HOME)}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-green-700 transition-colors">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${logoText} transition-colors`}>
              Bizone
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {nav.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${textColor} ${hoverText}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full pl-2 pr-3 py-1.5 hover:bg-black/5 transition-colors"
                >
                  <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                  <span className={`text-sm font-medium ${textColor}`}>{user?.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${textColor} ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50"
                    >
                      <div className="px-3 py-2 border-b border-gray-100 mb-1">
                        <p className="text-xs font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                      </div>
                      <button onClick={() => go(ROUTES.DASHBOARD)} className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-auto transition-colors">
                        <LayoutDashboard className="w-4 h-4 mr-2 text-gray-400" /> Dashboard
                      </button>
                      <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut className="w-4 h-4 mr-2" /> Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={() => go(ROUTES.AUTH.LOGIN)}
                  className={`text-sm font-medium transition-colors ${textColor} ${hoverText}`}
                >
                  Sign in
                </button>
                <Button
                  onClick={() => go(ROUTES.AUTH.REGISTER)}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-xl shadow-sm"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors ${textColor}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-black/5"
            >
              <div className="py-4 space-y-1">
                {nav.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${textColor} ${hoverText} hover:bg-black/5`}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-3 border-t border-black/5 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl" onClick={() => go(ROUTES.DASHBOARD)}>
                        <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                      </Button>
                      <Button variant="outline" className="w-full border-gray-200 rounded-xl text-red-500" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" /> Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full border-gray-200 rounded-xl" onClick={() => go(ROUTES.AUTH.LOGIN)}>
                        Sign in
                      </Button>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl" onClick={() => go(ROUTES.AUTH.REGISTER)}>
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

export default Header