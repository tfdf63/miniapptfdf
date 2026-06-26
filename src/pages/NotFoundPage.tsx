import { Link } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { PageShell } from '@/components/layout/PageShell'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import {
	GlassCard,
	GlassCardContent,
} from '@/components/ui/glass-card'

export function NotFoundPage() {
	return (
		<>
			<PageMeta noindex title="Страница не найдена" />
			<PageShell wide>
				<SectionHeading
					title="Страница не найдена"
					subtitle="Такой страницы на сайте ФФДТ нет. Проверьте адрес или перейдите на главную."
				/>
				<GlassCard glow>
					<GlassCardContent className="flex flex-wrap gap-3 pt-6">
						<Button asChild variant="neon" size="lg" className="min-h-[44px]">
							<Link to="/">На главную</Link>
						</Button>
						<Button asChild variant="outline-glass" size="lg" className="min-h-[44px]">
							<Link to="/events">Соревнования</Link>
						</Button>
					</GlassCardContent>
				</GlassCard>
				<Footer />
			</PageShell>
		</>
	)
}
