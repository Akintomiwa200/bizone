"use client"

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Building, CreditCard, Truck, BarChart3, Shield, Users } from 'lucide-react'

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const features = [
    {
      icon: <Building className="h-8 w-8" />,
      title: "Digital Storefront",
      description: "Create your online presence with customizable digital storefronts"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Financial Services",
      description: "Access credit, manage payments, and track your finances"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Logistics Network",
      description: "Reliable delivery services across Nigeria"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Business Analytics",
      description: "Make data-driven decisions with real-time insights"
    }
  ]

  const stats = [
    { value: "10,000+", label: "Businesses Empowered" },
    { value: "₦500M+", label: "Credit Disbursed" },
    { value: "50,000+", label: "Deliveries Completed" },
    { value: "85%", label: "Success Rate" }
  ]

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Empowering Nigerian <span className="text-blue-600">MSMEs</span> to Thrive
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Your all-in-one platform for digital storefronts, financial services, 
                  business analytics, and reliable logistics. Grow your business with Bizone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Start Your Business Journey
                  </Button>
                  <Button size="lg" variant="outline">
                    Watch Demo
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="font-semibold text-blue-900">For Businesses</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4 text-center">
                        <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="font-semibold text-green-900">Financial Access</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-orange-50 border-orange-200">
                      <CardContent className="p-4 text-center">
                        <Truck className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <p className="font-semibold text-orange-900">Logistics</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4 text-center">
                        <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="font-semibold text-purple-900">Analytics</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-y">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Everything Your Business Needs
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Four powerful solutions integrated into one seamless platform designed for Nigerian MSMEs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0">
                  <CardContent className="p-6 text-center">
                    <div className="text-blue-600 mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of Nigerian businesses already growing with Bizone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Create Your Store
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Bizone</h3>
                <p className="text-gray-400">
                  Empowering Nigerian MSMEs with integrated business solutions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Solutions</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Digital Storefront</a></li>
                  <li><a href="#" className="hover:text-white">Financial Services</a></li>
                  <li><a href="#" className="hover:text-white">Logistics</a></li>
                  <li><a href="#" className="hover:text-white">Analytics</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>© 2024 Bizone Platform. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  )
}