import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const serverEntry = path.join(distDir, 'server/entry-server.js')

const { render } = await import(pathToFileURL(serverEntry).href)

const templatePath = path.join(distDir, 'index.html')
const baseTemplate = fs.readFileSync(templatePath, 'utf-8')

const routes = ['/', '/parkh3'] as const

function injectHelmet(
	html: string,
	helmet: {
		title: { toString(): string }
		meta: { toString(): string }
		link: { toString(): string }
		script: { toString(): string }
	},
) {
	const headTags = [
		helmet.title.toString(),
		helmet.meta.toString(),
		helmet.link.toString(),
		helmet.script.toString(),
	]
		.filter(Boolean)
		.join('\n    ')

	let page = html
		.replace(/<title>[\s\S]*?<\/title>\s*/i, '')
		.replace(/<meta name="description"[^>]*>\s*/i, '')

	if (headTags) {
		page = page.replace('</head>', `    ${headTags}\n  </head>`)
	}

	return page
}

for (const url of routes) {
	const { html, helmet } = render(url)
	const withMeta = injectHelmet(baseTemplate, helmet)
	const wrapped = withMeta.replace(
		'<div id="root"></div>',
		`<div id="root">${html}</div>`,
	)

	if (url === '/') {
		fs.writeFileSync(templatePath, wrapped)
		continue
	}

	const dir = path.join(distDir, url.slice(1))
	fs.mkdirSync(dir, { recursive: true })
	fs.writeFileSync(path.join(dir, 'index.html'), wrapped)
}

console.log('Prerendered:', routes.join(', '))
