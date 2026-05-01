"use client"

import { MessageCircle, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section - WhatsApp First */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50" />
          
          <div className="relative container mx-auto max-w-4xl px-6 text-center">
            {/* WhatsApp Badge */}
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-100 border border-green-200 rounded-full px-5 py-2 mb-8">
              <MessageCircle className="w-4 h-4" />
              Powered Entirely by WhatsApp
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Every Business Operation<br />
              <span className="text-green-600">in One WhatsApp Chat</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Create account, list products, place orders, make payments, track delivery — 
              <strong className="text-gray-700">everything happens in WhatsApp</strong>. 
              No app to install. No complex dashboard.
            </p>

            {/* Primary CTA - WhatsApp */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-7 rounded-2xl text-lg font-semibold shadow-xl shadow-green-200 group"
                onClick={() => window.open('https://wa.me/1234567890', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start on WhatsApp
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-10 py-7 rounded-2xl text-lg font-semibold"
                onClick={() => window.location.href = '/dashboard'}
              >
                View Dashboard
              </Button>
            </div>

            {/* WhatsApp Phone Mockup */}
            <div className="max-w-sm mx-auto">
              <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-[#ECE5DD] rounded-[2.5rem] overflow-hidden" style={{ height: '600px' }}>
                  {/* WhatsApp Header */}
                  <div className="bg-[#075E54] p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                      B
                    </div>
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm">BizOne Business</p>
                      <p className="text-green-200 text-xs">WhatsApp Business</p>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-3 overflow-y-auto" style={{ height: '500px' }}>
                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%] shadow-sm">
                        <p className="text-xs font-semibold text-green-600 mb-1">BizOne Bot</p>
                        <p className="text-sm text-gray-800">Hi! I'm BizOne. What would you like to do?</p>
                        <p className="text-[10px] text-gray-400 text-right mt-1">9:00 AM</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%] shadow-sm">
                        <p className="text-sm text-gray-800">Create account as farmer</p>
                        <p className="text-[10px] text-gray-500 text-right mt-1">9:01 AM ✓✓</p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%] shadow-sm">
                        <p className="text-xs font-semibold text-green-600 mb-1">BizOne Bot</p>
                        <p className="text-sm text-gray-800">Account created! 🎉 Now share your location to list products.</p>
                        <p className="text-[10px] text-gray-400 text-right mt-1">9:01 AM</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%] shadow-sm">
                        <p className="text-sm text-gray-800">Sell yam for ₦5,000 per bag</p>
                        <p className="text-[10px] text-gray-500 text-right mt-1">9:02 AM ✓✓</p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%] shadow-sm">
                        <p className="text-xs font-semibold text-green-600 mb-1">BizOne Bot</p>
                        <p className="text-sm text-gray-800">✅ Product listed! Yam at ₦5,000 is now available.</p>
                        <p className="text-[10px] text-gray-400 text-right mt-1">9:02 AM</p>
                      </div>
                    </div>
                  </div>

                  {/* Input */}
                  <div className="bg-[#F0F0F0] p-3 flex items-center gap-2">
                    <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400">
                      Type a message...
                    </div>
                    <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Do Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Everything Happens in WhatsApp
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  emoji: '👤',
                  title: 'Account & Setup',
                  items: ['Create account', 'Choose role (Farmer/Buyer/Rider)', 'Set location', 'Verify phone']
                },
                {
                  emoji: '🛒',
                  title: 'Products & Orders',
                  items: ['List products for sale', 'Browse nearby products', 'Place orders', 'Negotiate prices']
                },
                {
                  emoji: '💳',
                  title: 'Payments & Delivery',
                  items: ['Deposit money', 'Pay for orders', 'Track delivery', 'Rate service']
                }
              ].map((section, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="text-3xl mb-4">{section.emoji}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Setup Guide CTA */}
        <section className="py-16 bg-green-600">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Need to Set Up WhatsApp Business?
            </h2>
            <p className="text-green-100 mb-8">
              Read our complete setup guide for configuring WhatsApp Business API, webhooks, and bot management.
            </p>
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50 px-8 py-6 rounded-xl font-semibold"
              onClick={() => window.location.href = '/WHATSAPP_SETUP_GUIDE.md'}
            >
              View Setup Guide
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
