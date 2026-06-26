import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

type RenderWithProvidersOptions = RenderOptions & {
	router?: MemoryRouterProps
}

export function renderWithProviders(
	ui: ReactElement,
	{ router, ...options }: RenderWithProvidersOptions = {},
) {
	return render(
		<HelmetProvider>
			<ThemeProvider>
				<MemoryRouter {...router}>{ui}</MemoryRouter>
			</ThemeProvider>
		</HelmetProvider>,
		options,
	)
}
