import { Home, Footer } from '@/components'

export function HomePage() {
  return (
    <main className="min-h-screen scroll-smooth">
      <div className="container mx-auto max-w-6xl space-y-16 px-4 py-6 md:space-y-20 md:py-8">
        <Home />
        <Footer />
      </div>
    </main>
  )
}
