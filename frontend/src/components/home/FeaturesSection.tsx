"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Button from '@/components/ui/Button'
import { 
  Store, 
  CreditCard, 
  Truck, 
  BarChart3, 
  Shield, 
  Zap,
  ArrowRight,
  Smartphone,
  Users,
  Target,
  Globe,
  PieChart,
  Wallet,
  Package,
  ShieldCheck,
  SmartphoneCharging
} from 'lucide-react'

const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3
      }
    }
  }

  const features = [
    {
      icon: <Store className="w-8 h-8" />,
      title: "Digital Storefront",
      description: "Create beautiful online stores with AI-powered design and seamless inventory management.",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      capabilities: ["AI Store Builder", "Inventory Management", "Multi-channel Sales"]
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Financial Inclusion",
      description: "Access credit, manage payments, and track finances with smart financial tools.",
      color: "green",
      gradient: "from-green-500 to-green-600",
      capabilities: ["Business Loans", "Payment Processing", "Financial Analytics"]
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Smart Logistics",
      description: "Optimized delivery network with real-time tracking and route optimization across Nigeria.",
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
      capabilities: ["Real-time Tracking", "Route Optimization", "Nationwide Coverage"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Business Intelligence",
      description: "AI-powered analytics and insights to drive data-informed business decisions.",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      capabilities: ["Sales Analytics", "Customer Insights", "Performance Metrics"]
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-level security with encryption and compliance for your business data.",
      color: "red",
      gradient: "from-red-500 to-red-600",
      capabilities: ["Data Encryption", "PCI Compliance", "Backup & Recovery"]
    },
    {
      icon: <SmartphoneCharging className="w-8 h-8" />,
      title: "Mobile First",
      description: "Manage your business on-the-go with our responsive mobile-optimized platform.",
      color: "indigo",
      gradient: "from-indigo-500 to-indigo-600",
      capabilities: ["Mobile Dashboard", "Push Notifications", "Offline Mode"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Management",
      description: "Build lasting relationships with integrated CRM and customer engagement tools.",
      color: "teal",
      gradient: "from-teal-500 to-teal-600",
      capabilities: ["CRM Integration", "Customer Support", "Loyalty Programs"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Marketing Tools",
      description: "Reach more customers with built-in marketing automation and campaign management.",
      color: "pink",
      gradient: "from-pink-500 to-pink-600",
      capabilities: ["Email Marketing", "Social Media", "Promotional Campaigns"]
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Revenue Analytics",
      description: "Track performance and optimize revenue streams with comprehensive analytics.",
      color: "amber",
      gradient: "from-amber-500 to-amber-600",
      capabilities: ["Revenue Tracking", "Profit Analysis", "Growth Metrics"]
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-40 h-40 bg-blue-100 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-20 w-48 h-48 bg-green-100 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Everything You Need to Grow
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Built for Nigerian{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MSMEs
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive tools and features designed specifically to address the unique challenges 
            faced by Nigerian small and medium businesses
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Main Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                {/* Icon */}
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:shadow-lg`}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                  {feature.description}
                </p>

                {/* Capabilities */}
                <div className="space-y-2 mb-6">
                  {feature.capabilities.map((capability, capIndex) => (
                    <motion.div
                      key={capIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + capIndex * 0.1 + 0.5 }}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <div className={`w-2 h-2 bg-${feature.color}-400 rounded-full mr-3`} />
                      {capability}
                    </motion.div>
                  ))}
                </div>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="flex items-center text-blue-600 font-medium text-sm"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>

              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 blur-md transition-opacity duration-500 -z-10`} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of Nigerian businesses already accelerating their growth with Bizone's comprehensive platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 hover:border-blue-300">
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection