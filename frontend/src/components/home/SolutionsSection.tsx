"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Button from '@/components/ui/Button'
import { 
  Store, 
  Building, 
  Users, 
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  BarChart3,
  Shield
} from 'lucide-react'

const SolutionsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const solutions = [
    {
      category: 'For Retail Businesses',
      title: 'Retail Pro Suite',
      description: 'Complete digital transformation for retail stores and small shops across Nigeria.',
      icon: <Store className="w-8 h-8" />,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      features: [
        'Online Store Creation',
        'Inventory Management',
        'POS Integration',
        'Customer Loyalty Programs'
      ],
      cta: 'Start Retail Trial',
      popular: true
    },
    {
      category: 'For Growing MSMEs',
      title: 'Business Growth Platform',
      description: 'Scalable solutions for established businesses ready to expand operations.',
      icon: <Building className="w-8 h-8" />,
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      features: [
        'Multi-location Management',
        'Advanced Analytics',
        'Team Collaboration',
        'Custom Workflows'
      ],
      cta: 'Scale My Business',
      popular: false
    },
    {
      category: 'For Service Providers',
      title: 'Service Excellence Suite',
      description: 'Streamline service delivery and customer management for service-based businesses.',
      icon: <Users className="w-8 h-8" />,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      features: [
        'Appointment Scheduling',
        'Service Tracking',
        'Client Management',
        'Payment Collection'
      ],
      cta: 'Try Service Tools',
      popular: false
    }
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-green-100 rounded-full blur-3xl"
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
            <Target className="w-4 h-4 mr-2" />
            Tailored for Nigerian Businesses
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Solutions for Every{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Business Type
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect solution designed specifically for your business model and growth stage
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group relative"
            >
              {/* Popular Badge */}
              {solution.popular && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Most Popular
                  </div>
                </motion.div>
              )}

              {/* Solution Card */}
              <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 h-full flex flex-col relative overflow-hidden ${
                solution.popular ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${solution.gradient} flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    {solution.icon}
                  </div>
                  <div className={`text-sm font-semibold text-${solution.color}-600 mb-2`}>
                    {solution.category}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {solution.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8 flex-grow">
                  {solution.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + featureIndex * 0.1 + 0.3 }}
                      className="flex items-center text-gray-700"
                    >
                      <CheckCircle className={`w-5 h-5 text-${solution.color}-500 mr-3 flex-shrink-0`} />
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className={`w-full bg-gradient-to-r ${solution.gradient} hover:shadow-lg text-white border-0`}
                    size="lg"
                  >
                    {solution.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">
                Need a Custom Solution?
              </h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team can create a tailored solution specifically for your unique business requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                Contact Sales Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Get Business Assessment
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionsSection