import { Globe2, ShieldCheck, Sparkles, Users } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const values = [
  {
    icon: <Users className="h-5 w-5 text-blue-600" />,
    title: 'Built for MSMEs',
    description: 'Every workflow is designed around real operational needs of Nigerian businesses.',
  },
  {
    icon: <Sparkles className="h-5 w-5 text-emerald-600" />,
    title: 'Simple by Design',
    description: 'WhatsApp-first flows keep onboarding and daily operations fast and familiar.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-violet-600" />,
    title: 'Reliable Transactions',
    description: 'Payments, delivery updates, and records are tracked in one clear timeline.',
  },
  {
    icon: <Globe2 className="h-5 w-5 text-amber-600" />,
    title: 'Local Impact',
    description: 'Bizone strengthens farmers, riders, and merchants across Nigerian communities.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16">
        <section className="mb-14 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">About Bizone</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
            Bizone is an all-in-one business companion platform helping Nigerian MSMEs run digital
            storefronts, manage orders, handle payments, and coordinate deliveries from one place.
          </p>
        </section>

        <section className="mb-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">Our Mission</h2>
            <p className="text-gray-600">
              Make business operations and transactions simple, trusted, and accessible for every
              small and medium enterprise in Nigeria.
            </p>
          </article>
          <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">Our Focus</h2>
            <p className="text-gray-600">
              Solving digitalization, financial inclusion, productivity, and logistics with practical
              workflows that teams can use immediately.
            </p>
          </article>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50">
                {value.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{value.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
