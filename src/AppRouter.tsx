import { lazy, useEffect, Suspense } from 'react'
import CookieBanner from './components/CookieBanner'

const HomePage = lazy(() => import('./App').then(module => ({ default: module.HomePage })))
const PrivacyPage = lazy(() => import('./pages/StaticPages').then(module => ({ default: module.PrivacyPage })))
const TermsPage = lazy(() => import('./pages/StaticPages').then(module => ({ default: module.TermsPage })))
const ThankYouPage = lazy(() => import('./pages/StaticPages').then(module => ({ default: module.ThankYouPage })))
const NotFoundPage = lazy(() => import('./pages/StaticPages').then(module => ({ default: module.NotFoundPage })))

const pageMeta: Record<string, { title: string; description: string; noindex?: boolean }> = {
  '/': { title: 'Arkajeet Mukherjee — Systems & Software Developer', description: 'Arkajeet Mukherjee is a systems and software developer working across full-stack engineering, digital marketing, and 10+ years of audio production.' },
  '/privacy': { title: 'Privacy Policy — Arkajeet Mukherjee', description: 'Learn what the Arkajeet Mukherjee portfolio stores in your browser, what it does not collect, and how external contact links work.' },
  '/terms': { title: 'Terms of Use — Arkajeet Mukherjee', description: 'Terms for using Arkajeet Mukherjee’s personal portfolio website.' },
  '/thank-you': { title: 'Thank You — Arkajeet Mukherjee', description: 'Thanks for getting in touch with Arkajeet Mukherjee.', noindex: true },
  '404': { title: 'Page Not Found — Arkajeet Mukherjee', description: 'This page could not be found on Arkajeet Mukherjee’s portfolio.', noindex: true },
}

function RouteLoading() {
  return <main className="route-loading" role="status" aria-live="polite"><span className="loading-indicator" />Loading page…</main>
}

export default function AppRouter() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const meta = pageMeta[path] ?? pageMeta['404']

  useEffect(() => {
    document.title = meta.title
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }
    description.content = meta.description
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (meta.noindex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'noindex,follow'
    } else if (robots) {
      robots.remove()
    }
  }, [meta])

  const page = path === '/' ? <HomePage /> : path === '/privacy' ? <PrivacyPage /> : path === '/terms' ? <TermsPage /> : path === '/thank-you' ? <ThankYouPage /> : <NotFoundPage />

  return <><Suspense fallback={<RouteLoading />}>{page}</Suspense><CookieBanner /></>
}
