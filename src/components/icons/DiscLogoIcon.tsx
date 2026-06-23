import { cn } from '@/lib/utils'

type DiscLogoIconProps = {
	className?: string
	iconClassName?: string
}

/** Компактная SVG-иконка летающего диска для логотипа в header. */
export function DiscLogoIcon({ className, iconClassName }: DiscLogoIconProps) {
	return (
		<span
			className={cn(
				'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary shadow-neon-sm',
				className,
			)}
			aria-hidden
		>
			<svg
				viewBox="0 0 24 24"
				className={cn('h-5 w-5 text-primary-foreground', iconClassName)}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
				<circle cx="12" cy="12" r="2.5" fill="currentColor" />
				<path
					d="M12 3a9 9 0 0 1 7.8 4.5"
					stroke="currentColor"
					strokeWidth="1.75"
					strokeLinecap="round"
					opacity="0.85"
				/>
			</svg>
		</span>
	)
}
