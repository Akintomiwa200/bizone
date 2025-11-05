import RegisterForm from './components/RegisterForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account - Bizone',
  description: 'Join Bizone and empower your Nigerian MSME with digital storefronts, financial services, logistics, and business analytics.',
}

export default function SignupPage() {
  return <RegisterForm />
}