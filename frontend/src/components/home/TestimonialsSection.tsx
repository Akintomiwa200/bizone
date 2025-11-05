"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  Star, 
  MapPin, 
  Quote, 
  TrendingUp, 
  Truck, 
  CreditCard,
  Zap,
  Award,
  Heart
} from 'lucide-react'

const TestimonialsSection = () => {
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

  const testimonials = [
    {
      name: "Amina Mohammed",
      business: "Amina's Fashion Store",
      location: "Lagos",
      content: "Bizone helped me take my fashion business online. My sales increased by 300% in just 3 months! The digital storefront was so easy to set up.",
      avatar: "AM",
      rating: 5,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "green",
      gradient: "from-green-500 to-green-600"
    },
    {
      name: "Chukwuma Okoro",
      business: "Fresh Farm Produce",
      location: "Enugu",
      content: "The delivery network is amazing! I can now reach customers across Nigeria with reliable logistics. My customer base has expanded tremendously.",
      avatar: "CO",
      rating: 5,
      icon: <Truck className="w-5 h-5" />,
      color: "orange",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      name: "Bola Adekunle",
      business: "Tech Gadgets Hub",
      location: "Abuja",
      content: "The business loan I got through Bizone helped me expand my inventory. The process was smooth and the financial tools are incredible.",
      avatar: "BA",
      rating: 5,
      icon: <CreditCard className="w-5 h-5" />,
      color: "blue",
      gradient: "from-blue-500 to-blue-600"
    }
  ]

  const trustBadges = [
    { name: "TechCabal", icon: <Zap className="w-6 h-6" /> },
    { name: "BusinessDay", icon: <TrendingUp className="w-6 h-6" /> },
    { name: "The Guardian", icon: <Award className="w-6 h-6" /> },
    { name: "Punch", icon: <Heart className="w-6 h-6" /> }
  ]

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
          >
            <Star 
              className={`w-5 h-5 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`} 
            />
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
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
          className="absolute top-20 left-20 w-40 h-40 bg-blue-100 rounded-full blur-3xl"
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
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-48 h-48 bg-green-100 rounded-full blur-3xl"
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
            <Quote className="w-4 h-4 mr-2" />
            Real Stories, Real Results
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Nigerian{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Entrepreneurs
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            See how businesses across Nigeria are transforming their operations and accelerating growth with Bizone
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <Card className="hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                <CardContent className="p-8 relative">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-200 transition-colors"
                  >
                    <Quote className="w-12 h-12" />
                  </motion.div>

                  {/* Feature Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white mb-6`}
                  >
                    {testimonial.icon}
                  </motion.div>

                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg italic relative z-10">
                    "{testimonial.content}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4"
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.business}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-gray-500 mb-8 text-lg font-medium"
          >
            Featured in leading publications
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-12 opacity-70"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1,
                  opacity: 1,
                  transition: { duration: 0.3 }
                }}
                className="flex items-center gap-3 text-gray-700 font-semibold text-lg group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-blue-600 group-hover:text-blue-700 transition-colors"
                >
                  {badge.icon}
                </motion.div>
                {badge.name}
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="mt-12 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
                <div className="flex justify-center sm:justify-start mb-2">
                  <StarRating rating={5} />
                </div>
                <p className="text-gray-600 text-sm">Average customer rating</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
                <p className="text-gray-600 text-sm">Businesses empowered</p>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
                <p className="text-gray-600 text-sm">Would recommend</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection