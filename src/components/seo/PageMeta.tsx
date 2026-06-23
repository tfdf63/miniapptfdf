import { Helmet } from 'react-helmet-async'
import {
	absoluteUrl,
	buildPageMeta,
	site,
	type SitePageMeta,
} from '@/config/site'

type PageMetaProps =
	| {
			page: SitePageMeta
			noindex?: false
			title?: never
	  }
	| {
			noindex: true
			title: string
			page?: never
	  }

export function PageMeta(props: PageMetaProps) {
	if (props.noindex) {
		return (
			<Helmet>
				<title>{props.title}</title>
				<meta name="robots" content="noindex, nofollow" />
			</Helmet>
		)
	}

	const meta = buildPageMeta(props.page)

	return (
		<Helmet>
			<title>{meta.title}</title>
			<meta name="description" content={meta.description} />
			<link rel="canonical" href={meta.canonical} />
			<meta property="og:title" content={meta.og.title} />
			<meta property="og:description" content={meta.og.description} />
			<meta property="og:url" content={meta.og.url} />
			<meta property="og:image" content={meta.og.image} />
			<meta property="og:type" content={meta.og.type} />
			<meta property="og:locale" content={meta.og.locale} />
			<meta property="og:site_name" content={meta.og.siteName} />
			<meta name="twitter:card" content={meta.twitter.card} />
			<meta name="twitter:title" content={meta.twitter.title} />
			<meta name="twitter:description" content={meta.twitter.description} />
			<meta name="twitter:image" content={meta.twitter.image} />
		</Helmet>
	)
}

export function homeOrganizationJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'SportsOrganization',
				name: site.name,
				alternateName: site.shortName,
				url: site.url,
				sport: ['Ultimate', 'Disc Golf'],
				sameAs: [site.social.telegram, site.social.vk],
			},
			{
				'@type': 'WebSite',
				name: site.name,
				url: site.url,
			},
		],
	}
}

export function parkH3LocationJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'SportsActivityLocation',
		name: 'Диск-гольф парк «H3»',
		description: site.pages.parkH3.description,
		url: absoluteUrl('/parkh3'),
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Тольятти',
			addressRegion: 'Самарская область',
			addressCountry: 'RU',
		},
	}
}
