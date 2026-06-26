import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '@/App'
import { renderWithProviders } from '@/test/render'

describe('App routing', () => {
	it('renders not found page for unknown paths', () => {
		const { unmount } = renderWithProviders(<App />, {
			router: { initialEntries: ['/no-such-page'] },
		})

		expect(
			screen.getByRole('heading', { name: 'Страница не найдена' }),
		).toBeInTheDocument()

		unmount()
	})

	it('does not render not found page for known paths', () => {
		renderWithProviders(<App />, {
			router: { initialEntries: ['/parkh3'] },
		})

		expect(
			screen.getByRole('heading', {
				level: 1,
				name: /диск-гольф парк «h3»/i,
			}),
		).toBeInTheDocument()
		expect(
			screen.queryByRole('heading', { name: 'Страница не найдена' }),
		).not.toBeInTheDocument()
	})
})
