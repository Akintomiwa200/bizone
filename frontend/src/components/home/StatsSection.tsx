"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Shield, Zap, Globe } from 'lucide-react'

const StatsSection = () => {
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const numberVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }
  }

  const stats = [
    {
      number: '10,000',
      label: 'Businesses Empowered',
      suffix: '+',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'blue',
      description: 'Nigerian MSMEs growing with Bizone'
    },
    {
      number: '₦500M',
      label: 'Credit Disbursed',
      suffix: '+',
      icon: <Zap className="w-6 h-6" />,
      color: 'green',
      description: 'In business loans and financing'
    },
    {
      number: '50,000',
      label: 'Deliveries Completed',
      suffix: '+',
      icon: <Globe className="w-6 h-6" />,
      color: 'orange',
      description: 'Across Nigeria with 99% success rate'
    },
    {
      number: '98.5',
      label: 'Uptime Guarantee',
      suffix: '%',
      icon: <Shield className="w-6 h-6" />,
      color: 'purple',
      description: 'Platform reliability and performance'
    }
  ]

  const Counter = ({ value, suffix }: { value: string; suffix?: string }) => {
    const numericValue = value.replace(/[^0-9.]/g, '')
    const prefix = value.replace(numericValue, '')

    return (
      <div className="flex items-baseline justify-center">
        {prefix && (
          <span className="text-2xl md:text-3xl font-light mr-1">{prefix}</span>
        )}
        <motion.span
          variants={numberVariants}
          className="text-4xl md:text-5xl font-bold"
        >
          {numericValue}
        </motion.span>
        {suffix && (
          <span className="text-2xl md:text-3xl font-light ml-1">{suffix}</span>
        )}
      </div>
    )
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-10 right-10 w-24 h-24 bg-green-200 rounded-full blur-xl"
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Nigerian{' '}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Businesses
              </span>
            </h2>
          </motion.div>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of MSMEs across Nigeria who are transforming their operations 
            and accelerating growth with Bizone's integrated business solutions
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5 
                  }}
                  className={`w-14 h-14 rounded-2xl bg-${stat.color}-100 flex items-center justify-center text-${stat.color}-600 mb-6 mx-auto group-hover:shadow-lg transition-shadow`}
                >
                  {stat.icon}
                </motion.div>

                {/* Number */}
                <div className="mb-3">
                  <Counter value={stat.number} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className={`text-lg font-semibold text-${stat.color}-900 mb-3`}>
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Animated underline */}
                <motion.div
                  className={`h-1 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 rounded-full mt-4`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                />
              </div>

              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-${stat.color}-500/10 blur-md group-hover:bg-${stat.color}-500/20 transition-all duration-300 -z-10`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-8 mt-16 pt-8 border-t border-gray-200/50"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">🏆</div>
            <p className="text-sm text-gray-600">Award Winning Platform</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">🔒</div>
            <p className="text-sm text-gray-600">Bank-Level Security</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">⭐</div>
            <p className="text-sm text-gray-600">4.9/5 Customer Rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection