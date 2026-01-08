import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// Define routes to pre-render (excluding dynamic routes and admin pages)
const routesToPrerender = [
  '/',
  '/about',
  '/team',
  '/services',
  '/beauty-nails',
  '/news',
  '/career',
  '/contact',
  '/our-customers',
  '/faq',
  '/reviews',
  '/booking',
  '/shop',
  '/terms-and-conditions',
  '/privacy-policy'
]

;(async () => {
  for (const url of routesToPrerender) {
    try {
      const appHtml = render(url)
      const html = template.replace('<!--app-html-->', appHtml)

      const filePath = `dist${url === '/' ? '/index' : url}.html`
      fs.writeFileSync(toAbsolute(filePath), html)
      console.log('pre-rendered:', filePath)
    } catch (error) {
      console.error(`Failed to pre-render ${url}:`, error.message)
    }
  }
})()
