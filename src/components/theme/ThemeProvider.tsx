import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

type ThemeContextValue = {
	theme: Theme
	setTheme: (theme: Theme) => void
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): Theme {
	if (typeof window === 'undefined') return 'dark'
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

function getStoredTheme(): Theme | null {
	if (typeof window === 'undefined') return null
	const stored = localStorage.getItem(STORAGE_KEY)
	if (stored === 'light' || stored === 'dark') return stored
	return null
}

function applyTheme(theme: Theme) {
	const root = document.documentElement
	root.classList.toggle('dark', theme === 'dark')
	root.style.colorScheme = theme

	const meta = document.querySelector('meta[name="theme-color"]')
	if (meta) {
		meta.setAttribute('content', theme === 'dark' ? '#07070d' : '#f4f7fc')
	}
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(
		() => getStoredTheme() ?? getSystemTheme(),
	)

	useEffect(() => {
		applyTheme(theme)
		localStorage.setItem(STORAGE_KEY, theme)
	}, [theme])

	const setTheme = useCallback((next: Theme) => {
		setThemeState(next)
	}, [])

	const toggleTheme = useCallback(() => {
		setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
	}, [])

	const value = useMemo(
		() => ({ theme, setTheme, toggleTheme }),
		[theme, setTheme, toggleTheme],
	)

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	)
}

export function useTheme() {
	const ctx = useContext(ThemeContext)
	if (!ctx) {
		throw new Error('useTheme must be used within ThemeProvider')
	}
	return ctx
}
