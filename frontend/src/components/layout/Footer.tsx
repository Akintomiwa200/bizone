"use client"

import { motion } from 'framer-motion'
import { ROUTES } from '@/lib/routes'
import { 
  Building, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUp,
  Heart
} from 'lucide-react'
import { useState } from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribed:', email)
    setEmail('')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, threshold: 0.1 }}
      variants={containerVariants}
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 py-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Bizone</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering Nigerian MSMEs with integrated business solutions for digital transformation, 
              financial inclusion, and sustainable growth.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">+234 901 234 5678</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">hello@bizone.ng</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "#", label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="bg-gray-700 hover:bg-blue-600 p-2 rounded-lg transition-colors duration-300"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-lg mb-6 text-white">Solutions</h4>
            <ul className="space-y-3 text-gray-300">
              {[
                'Digital Storefront',
                'Financial Services',
                'Logistics Network',
                'Business Analytics',
                'Payment Processing',
                'Inventory Management'
              ].map((item, index) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "spring" }}>
                  <a href="#" className="hover:text-blue-400 transition-colors duration-300 text-sm">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-3 text-gray-300">
              {[
                'About Us',
                'Careers',
                'Contact',
                'Blog',
                'Press Kit',
                'Partners'
              ].map((item, index) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "spring" }}>
                  <a href="#" className="hover:text-blue-400 transition-colors duration-300 text-sm">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-lg mb-6 text-white">Support</h4>
            <ul className="space-y-3 text-gray-300">
              {[
                'Help Center',
                'Documentation',
                'API Status',
                'Community',
                'Service Status',
                'Contact Support'
              ].map((item, index) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "spring" }}>
                  <a href="#" className="hover:text-blue-400 transition-colors duration-300 text-sm">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-lg mb-6 text-white">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Get the latest news and updates about Bizone
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-700 py-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-4 md:mb-0">
            <span>© {currentYear} Bizone Platform. All rights reserved.</span>
            <Heart className="h-4 w-4 text-red-400" />
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-300">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
          </div>

          {/* Scroll to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer