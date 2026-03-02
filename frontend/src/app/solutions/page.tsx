import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SolutionsSection from '@/components/home/SolutionsSection'

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="pt-6">
        <SolutionsSection />
      </main>
      <Footer />
    </div>
  )
}
