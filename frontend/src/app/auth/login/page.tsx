import LoginForm from './components/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In - Bizone',
  description: 'Sign in to your Bizone business account to access digital storefront, financial services, logistics, and analytics.',
}

export default function LoginPage() {
  return <LoginForm />
}