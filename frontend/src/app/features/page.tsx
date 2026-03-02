import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FeaturesSection from '@/components/home/FeaturesSection'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="pt-6">
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
