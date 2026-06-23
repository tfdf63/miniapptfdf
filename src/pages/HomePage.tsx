import { Home, Footer } from '@/components'
import { PageMeta, homeOrganizationJsonLd } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { site } from '@/config/site'

export function HomePage() {
  return (
    <main className="min-h-screen scroll-smooth">
      <PageMeta page={site.pages.home} />
      <JsonLd data={homeOrganizationJsonLd()} />
      <div className="container mx-auto max-w-6xl space-y-16 px-4 py-6 md:space-y-20 md:py-8">
        <Home />
        <Footer />
      </div>
    </main>
  )
}
