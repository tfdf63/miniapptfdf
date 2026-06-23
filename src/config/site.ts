export type SitePageMeta = {
	title: string
	description: string
	path: string
	ogImage: string
}

export const site = {
	url: import.meta.env.VITE_SITE_URL ?? 'https://tfdf.ru',
	name: 'Федерация флаинг диска Тольятти',
	shortName: 'ФФДТ',
	locale: 'ru_RU',
	social: {
		telegram: 'https://t.me/tfdf63',
		vk: 'https://vk.com/tfdf63',
	},
	pages: {
		home: {
			title: 'ФФДТ — алтимат и диск-гольф в Тольятти',
			description:
				'Федерация флаинг диска Тольятти: тренировки и турниры по алтимату и диск-гольфу, парк «H3», как присоединиться к сообществу.',
			path: '/',
			ogImage: '/og/home.jpg',
		},
		parkH3: {
			title: 'Диск-гольф парк «H3» — Тольятти',
			description:
				'Первый в Тольятти построенный диск-гольф маршрут с корзинами в Комсомольском районе. Как начать играть и присоединиться к сообществу.',
			path: '/parkh3',
			ogImage: '/og/park-h3.jpg',
		},
	},
} as const

export function absoluteUrl(path: string): string {
	const base = site.url.replace(/\/$/, '')
	const normalized = path.startsWith('/') ? path : `/${path}`
	return `${base}${normalized}`
}

export function buildPageMeta(page: SitePageMeta) {
	const url = absoluteUrl(page.path)
	const ogImage = page.ogImage.startsWith('http')
		? page.ogImage
		: absoluteUrl(page.ogImage)

	return {
		title: page.title,
		description: page.description,
		canonical: url,
		og: {
			title: page.title,
			description: page.description,
			url,
			image: ogImage,
			type: 'website',
			locale: site.locale,
			siteName: site.name,
		},
		twitter: {
			card: 'summary_large_image',
			title: page.title,
			description: page.description,
			image: ogImage,
		},
	}
}

export function renderMetaTags(page: SitePageMeta): string {
	const meta = buildPageMeta(page)
	const tags = [
		`<title>${escapeHtml(meta.title)}</title>`,
		`<meta name="description" content="${escapeAttr(meta.description)}" />`,
		`<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`,
		`<meta property="og:title" content="${escapeAttr(meta.og.title)}" />`,
		`<meta property="og:description" content="${escapeAttr(meta.og.description)}" />`,
		`<meta property="og:url" content="${escapeAttr(meta.og.url)}" />`,
		`<meta property="og:image" content="${escapeAttr(meta.og.image)}" />`,
		`<meta property="og:type" content="${escapeAttr(meta.og.type)}" />`,
		`<meta property="og:locale" content="${escapeAttr(meta.og.locale)}" />`,
		`<meta property="og:site_name" content="${escapeAttr(meta.og.siteName)}" />`,
		`<meta name="twitter:card" content="${escapeAttr(meta.twitter.card)}" />`,
		`<meta name="twitter:title" content="${escapeAttr(meta.twitter.title)}" />`,
		`<meta name="twitter:description" content="${escapeAttr(meta.twitter.description)}" />`,
		`<meta name="twitter:image" content="${escapeAttr(meta.twitter.image)}" />`,
	]
	return tags.join('\n    ')
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
}

function escapeAttr(value: string): string {
	return escapeHtml(value).replace(/"/g, '&quot;')
}
