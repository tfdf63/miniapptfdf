import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { renderWithProviders } from '@/test/render'

describe('NotFoundPage', () => {
	it('shows title and navigation links', () => {
		renderWithProviders(<NotFoundPage />)

		expect(
			screen.getByRole('heading', { name: 'Страница не найдена' }),
		).toBeInTheDocument()
		expect(
			screen.getByText(/такой страницы на сайте ффдт нет/i),
		).toBeInTheDocument()
		expect(screen.getByRole('link', { name: 'На главную' })).toHaveAttribute(
			'href',
			'/',
		)
		expect(screen.getByRole('link', { name: 'Соревнования' })).toHaveAttribute(
			'href',
			'/events',
		)
	})
})
