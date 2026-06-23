import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme/ThemeProvider'
import { cn } from '@/lib/utils'

function SunIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-5 w-5"
			aria-hidden
		>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
		</svg>
	)
}

function MoonIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-5 w-5"
			aria-hidden
		>
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
		</svg>
	)
}

type ThemeToggleProps = {
	compact?: boolean
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
	const { theme, toggleTheme } = useTheme()
	const isDark = theme === 'dark'

	return (
		<Button
			type="button"
			variant="outline"
			size="icon"
			className={cn(
				'glass-panel shrink-0 border-primary/30 hover:border-primary/60 hover:shadow-neon-sm',
				compact
					? 'h-9 w-9 min-h-0 min-w-0'
					: 'min-h-[44px] min-w-[44px]',
			)}
			onClick={toggleTheme}
			aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
		>
			{isDark ? <SunIcon /> : <MoonIcon />}
		</Button>
	)
}
