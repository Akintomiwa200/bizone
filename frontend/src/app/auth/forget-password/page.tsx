"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { 
  Mail, 
  ArrowRight,
  Building,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'

const ForgotPasswordPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const handleBackToLogin = () => {
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-3 mb-6"
                >
                  <div className="bg-blue-600 p-2 rounded-xl">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Bizone
                  </h1>
                </motion.div>
                
                {!isSubmitted ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Reset Your Password
                    </h2>
                    <p className="text-gray-600">
                      Enter your email address and we'll send you instructions to reset your password.
                    </p>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Check Your Email
                    </h2>
                    <p className="text-gray-600">
                      We've sent password reset instructions to your email.
                    </p>
                  </>
                )}
              </div>

              {!isSubmitted ? (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your business email"
                        className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transition-all duration-300"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending Instructions...
                      </div>
                    ) : (
                      <>
                        Send Reset Instructions
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      What's next?
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        Check your email for reset instructions
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        Click the link in the email
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        Create your new password
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleBackToLogin}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    >
                      Back to Sign In
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                      className="w-full border-gray-300"
                    >
                      Try Another Email
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Back to Login Link */}
              {!isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-6"
                >
                  <button
                    onClick={handleBackToLogin}
                    className="flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium text-sm mx-auto"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to sign in
                  </button>
                </motion.div>
              )}

              {/* Support Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 pt-6 border-t border-gray-200 text-center"
              >
                <p className="text-sm text-gray-600">
                  Need help?{' '}
                  <a href="mailto:support@bizone.ng" className="text-blue-600 hover:text-blue-700 font-medium">
                    Contact support
                  </a>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage