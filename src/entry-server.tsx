import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import App from './App'

export type RenderResult = {
	html: string
	helmet: HelmetServerState
}

export function render(url: string): RenderResult {
	const helmetContext: { helmet?: HelmetServerState } = {}

	const html = renderToString(
		<HelmetProvider context={helmetContext}>
			<ThemeProvider>
				<MemoryRouter initialEntries={[url]}>
					<App />
				</MemoryRouter>
			</ThemeProvider>
		</HelmetProvider>,
	)

	return {
		html,
		helmet: helmetContext.helmet!,
	}
}
