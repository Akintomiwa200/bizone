"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/ui/Input'
import { FormData } from './RegisterForm'
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react'

interface VerificationStepProps {
  formData: FormData
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const VerificationStep = ({ formData, onFormChange }: VerificationStepProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={onFormChange}
            placeholder="Create a strong password"
            className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Must be at least 8 characters with uppercase, lowercase, and numbers
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onFormChange}
            placeholder="Confirm your password"
            className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          What you'll get:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Free digital storefront setup</li>
          <li>• Access to business loans</li>
          <li>• Logistics and delivery network</li>
          <li>• Business analytics dashboard</li>
          <li>• 14-day free trial</li>
        </ul>
      </div>
    </motion.div>
  )
}

export default VerificationStep