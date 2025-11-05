"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Users, CreditCard, Truck, BarChart3, Play, Shield, Zap, ArrowRight } from 'lucide-react'

const HeroSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  const features = [
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "Digital Storefront",
      description: "AI-powered online store creation",
      color: "blue",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <CreditCard className="h-10 w-10 text-green-600" />,
      title: "Financial Access",
      description: "Smart credit scoring & payments",
      color: "green",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: <Truck className="h-10 w-10 text-orange-600" />,
      title: "Smart Logistics",
      description: "AI-optimized delivery routes",
      color: "orange",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-purple-600" />,
      title: "Business Analytics",
      description: "Real-time predictive insights",
      color: "purple",
      gradient: "from-purple-500 to-purple-600"
    }
  ]

  return (
    <section ref={ref} className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg mb-6">
                <Zap className="w-4 h-4 mr-2" />
                🚀 Trusted by 10,000+ Nigerian Businesses
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              Your All-in-One{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Business
              </span>{' '}
              Growth Platform
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 leading-relaxed"
            >
              Bizone empowers Nigerian MSMEs with <strong>AI-powered</strong> digital storefronts, 
              smart financial services, optimized logistics, and predictive analytics - 
              all integrated into one seamless platform.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 hover:border-blue-300 hover:bg-blue-50 group">
                <Play className="w-4 h-4 mr-2 group-hover:text-blue-600" />
                Watch AI Demo
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center space-x-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white shadow-lg"
                    ></motion.div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <div className="font-semibold text-gray-900">10,000+</div>
                  <div>Businesses Growing</div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-500" />
                <span>PCI DSS Compliant</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Feature Cards */}
          <motion.div
            variants={containerVariants}
            className="relative"
          >
            {/* Floating Main Card */}
            <motion.div
              variants={itemVariants}
              animate={floatingAnimation}
              className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 relative z-10"
            >
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    variants={cardVariants}
                    whileHover="hover"
                    custom={index}
                  >
                    <Card className={`bg-gradient-to-br from-${feature.color}-50 to-white border-${feature.color}-200/50 hover:shadow-xl transition-all duration-300 h-full`}>
                      <CardContent className="p-6 text-center">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="mb-4"
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className={`font-bold text-${feature.color}-900 text-lg mb-2`}>
                          {feature.title}
                        </h3>
                        <p className={`text-${feature.color}-700 text-sm leading-relaxed`}>
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* AI Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
              >
                🤖 AI-Powered
              </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200/30 rounded-2xl blur-xl"
            ></motion.div>
            
            <motion.div
              animate={{
                y: [20, -20, 20],
                x: [10, -10, 10],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200/30 rounded-2xl blur-xl"
            ></motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection