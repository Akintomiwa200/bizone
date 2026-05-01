"use client"

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import Button from '@/components/ui/Button'
import { Users, CreditCard, BarChart3, ArrowRight, MessageCircle, MapPin } from 'lucide-react'

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface Message {
  id: number
  avatar: string
  name: string
  text: string
  time: string
  type: 'sent' | 'received'
  isBot?: boolean
}

/* ─────────────────────────────────────────
   WhatsApp Phone Mockup
───────────────────────────────────────── */
const WhatsAppMockup = () => {
  const messages: Message[] = [
    { id: 1, avatar: "🌾", name: "Emeka Farm", text: "Fresh tomatoes – ₦2,500/10kg. Ready today!", time: "9:12 AM", type: "received" },
    { id: 2, avatar: "🛒", name: "You", text: "3 bags please. Deliver to Maitama?", time: "9:14 AM", type: "sent" },
    { id: 3, avatar: "🤖", name: "Bizone", text: "✅ Confirmed!\n📦 3× Tomatoes · ₦7,500\n🚚 Tunde assigned · ETA 35 mins", time: "9:14 AM", type: "received", isBot: true },
    { id: 4, avatar: "🚚", name: "Tunde", text: "On my way! 📍 ETA 35 mins", time: "9:20 AM", type: "received" },
    { id: 5, avatar: "🛒", name: "You", text: "Payment sent ✅", time: "9:21 AM", type: "sent" },
  ]

  return (
    <div style={{ width: 260, height: 540, background: "#0a0a0a", borderRadius: 42, boxShadow: "0 50px 100px rgba(0,0,0,0.5), 0 0 0 1.5px #2a2a2a", position: "relative", display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: 0 }}>
      {/* Notch */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 90, height: 26, background: "#0a0a0a", borderBottomLeftRadius: 16, borderBottomRightRadius: 16, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#1a1a1a" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#111" }} />
      </div>
      {/* Screen */}
      <div style={{ margin: "5px 3px 3px 3px", borderRadius: 36, overflow: "hidden", flex: 1, display: "flex", flexDirection: "column", background: "#ECE5DD" }}>
        {/* WA Header */}
        <div style={{ background: "#075E54", padding: "26px 12px 10px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#25D366,#128C7E)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>🌿</div>
          <div>
            <div style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>Bizone Market</div>
            <div style={{ color: "#B2DFDB", fontSize: 9 }}>🟢 Farmer · Rider · Customer</div>
          </div>
        </div>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: "hidden", padding: "8px 6px", display: "flex", flexDirection: "column", gap: 5 }}>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.14 }}
              style={{ display: "flex", justifyContent: msg.type === "sent" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 4 }}
            >
              {msg.type === "received" && (
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: msg.isBot ? "linear-gradient(135deg,#25D366,#128C7E)" : "linear-gradient(135deg,#fbbf24,#f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0, marginBottom: 1 }}>
                  {msg.avatar}
                </div>
              )}
              <div style={{ maxWidth: "78%", background: msg.type === "sent" ? "#DCF8C6" : msg.isBot ? "linear-gradient(135deg,#E8F5E9,#C8E6C9)" : "#fff", borderRadius: msg.type === "sent" ? "12px 12px 3px 12px" : "12px 12px 12px 3px", padding: "5px 8px", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
                {msg.type === "received" && (
                  <div style={{ fontSize: 8.5, fontWeight: 700, color: msg.isBot ? "#1B5E20" : "#e67e22", marginBottom: 1 }}>{msg.name}</div>
                )}
                <div style={{ fontSize: 9.5, color: "#303030", lineHeight: 1.45, whiteSpace: "pre-line" }}>{msg.text}</div>
                <div style={{ fontSize: 8, color: "#aaa", textAlign: "right", marginTop: 2 }}>{msg.time} ✓✓</div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Input */}
        <div style={{ background: "#F0F0F0", padding: "5px 7px", display: "flex", alignItems: "center", gap: 5, borderTop: "1px solid #ddd" }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: 18, padding: "4px 10px", fontSize: 9, color: "#bbb" }}>Message…</div>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Hero Section
───────────────────────────────────────── */
const HeroSection = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.6 },
    },
  }

  const item: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  const float: Variants = {
    visible: {
      y: [-8, 8, -8] as number[],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative pt-12 pb-16 lg:pt-8 lg:pb-24 overflow-hidden bg-white"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-green-50 to-transparent rounded-full opacity-80" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-50 to-transparent rounded-full opacity-60" />
      </div>

      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* ── LEFT ── */}
          <div className="space-y-7 max-w-lg">

            {/* Eyebrow */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 border border-green-100 rounded-full px-4 py-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                Powered by WhatsApp
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-5xl lg:text-[58px] font-bold text-gray-950 leading-[1.1] tracking-tight"
            >
              Everything in{' '}
              <span className="text-green-600">WhatsApp</span>{' '}
              — nothing else.
            </motion.h1>

            {/* Sub */}
            <motion.p variants={item} className="text-lg text-gray-500 leading-relaxed">
              Create account, list products, place orders, make payments, track delivery — all through a simple WhatsApp chat. No app to install.
            </motion.p>

            {/* CTA */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-xl shadow-md shadow-green-200 group text-lg"
                onClick={() => window.open('https://wa.me/YOUR_PHONE_NUMBER', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start on WhatsApp
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50 px-8 py-6 rounded-xl text-lg"
                onClick={() => window.location.href = '/dashboard'}
              >
                View Dashboard
              </Button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={item}
              className="flex items-center gap-6 pt-2 border-t border-gray-100"
            >
              <div>
                <p className="text-2xl font-bold text-gray-900">3,200+</p>
                <p className="text-sm text-gray-400">Active users</p>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div>
                <p className="text-2xl font-bold text-gray-900">₦2.4M</p>
                <p className="text-sm text-gray-400">Processed daily</p>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div>
                <p className="text-2xl font-bold text-gray-900">36</p>
                <p className="text-sm text-gray-400">States covered</p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT — Phone + Floating Cards ── */}
          <motion.div
            variants={item}
            className="relative flex justify-center items-center"
            style={{ minHeight: 560 }}
          >
            {/* Glow */}
            <div style={{ position: "absolute", width: 300, height: 350, background: "radial-gradient(ellipse, rgba(37,211,102,0.18) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(30px)", pointerEvents: "none" }} />

            {/* Phone */}
            <motion.div variants={float} style={{ position: "relative", zIndex: 5 }}>
              <WhatsAppMockup />
            </motion.div>

            {/* Card — Farmer (top-left) */}
            <motion.div
              initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}
              style={{ position: "absolute", top: "6%", left: "0%", zIndex: 10 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex items-center gap-3"
            >
              <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center text-lg">🌾</div>
              <div>
                <p className="text-xs text-gray-400">Farmer</p>
                <p className="text-sm font-bold text-gray-900">Emeka's Farm</p>
                <p className="text-xs text-green-600 font-medium">+127 orders today</p>
              </div>
            </motion.div>

            {/* Card — Revenue (top-right) */}
            <motion.div
              initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.85 }}
              style={{ position: "absolute", top: "6%", right: "0%", zIndex: 10 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex items-center gap-3"
            >
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Growth</p>
                <p className="text-sm font-bold text-gray-900">+127%</p>
              </div>
            </motion.div>

            {/* Card — Delivery (mid-left) */}
            <motion.div
              initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.0 }}
              style={{ position: "absolute", top: "43%", left: "-5%", zIndex: 10 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex items-center gap-3"
            >
              <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center text-lg">🚚</div>
              <div>
                <p className="text-xs text-gray-400">Active rides</p>
                <p className="text-sm font-bold text-gray-900">15 live</p>
                <p className="text-xs text-orange-500 font-medium">Avg. ETA 32 min</p>
              </div>
            </motion.div>

            {/* Card — Payment (mid-right) */}
            <motion.div
              initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.1 }}
              style={{ position: "absolute", top: "43%", right: "-5%", zIndex: 10 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex items-center gap-3"
            >
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Processed</p>
                <p className="text-sm font-bold text-gray-900">₦2.4M</p>
              </div>
            </motion.div>

            {/* Card — Buyers (bottom-left) */}
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }}
              style={{ position: "absolute", bottom: "5%", left: "2%", zIndex: 10 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex items-center gap-3"
            >
              <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Buyers</p>
                <p className="text-sm font-bold text-gray-900">2,847</p>
              </div>
            </motion.div>

            {/* Card — Coverage (bottom-right) */}
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.3 }}
              style={{ position: "absolute", bottom: "5%", right: "2%", zIndex: 10 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex items-center gap-3"
            >
              <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
                <MapPin className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Coverage</p>
                <p className="text-sm font-bold text-gray-900">36 States</p>
              </div>
            </motion.div>

            {/* WA badge */}
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring", stiffness: 220 }}
              style={{ position: "absolute", top: "26%", right: "-1%", zIndex: 15, width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#25D366,#128C7E)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.45)" }}
            >
              <MessageCircle className="w-5 h-5 text-white fill-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection