"use client"

import { motion } from 'framer-motion'
import Input from '@/components/ui/Input'
import { FormData } from './RegisterForm'
import { User, Store, Mail, Phone } from 'lucide-react'

interface BusinessTypeStepProps {
  formData: FormData
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const BusinessTypeStep = ({ formData, onFormChange }: BusinessTypeStepProps) => {
  const businessTypes = [
    'Retail & E-commerce',
    'Services',
    'Manufacturing',
    'Agriculture',
    'Food & Beverage',
    'Technology',
    'Healthcare',
    'Education',
    'Other'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onFormChange}
              placeholder="Enter your full name"
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <div className="relative">
            <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={onFormChange}
              placeholder="Enter your business name"
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Type *
        </label>
        <select
          name="businessType"
          value={formData.businessType}
          onChange={onFormChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
        >
          <option value="">Select your business type</option>
          {businessTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={onFormChange}
              placeholder="Enter your business email"
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onFormChange}
              placeholder="+234 800 000 0000"
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              required
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BusinessTypeStep