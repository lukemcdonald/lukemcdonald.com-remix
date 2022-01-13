import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix'
import type { MetaFunction, LinksFunction, ErrorBoundaryComponent } from 'remix'

import { getSeoLinks, getSeoMeta } from '~/utils/seo'
import Layout from '~/components/layout'
import Entry from './components/entry'

import styles from './styles/tailwind.css'

const meta: MetaFunction = () => ({
  ...getSeoMeta(),
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  robots: 'index,follow',
  googlebot: 'index,follow',
  'google-site-verification': '4jMDBbKyVQPMqqE3YYqw2vabnA3CR_uU9l2sOtRRmjM',
  'theme-color': '#7dc149',
})

const links: LinksFunction = () => [
  ...getSeoLinks(),
  { rel: 'stylesheet', href: styles },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicons/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: '/favicons/favicon.svg',
  },
  {
    rel: 'alternate icon',
    type: 'image/svg+xml',
    href: '/favicons/favicon.svg',
  },
]

function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}

const CatchBoundary: React.VFC = () => {
  let caught = useCatch()
  let message

  switch (caught.status) {
    case 401:
      message = `Oops! Looks like you tried to visit a page that you do not have access to.`
      break
    case 404:
      message = `Oops! Looks like you tried to visit a page that does not exist.`
      break
    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <Entry
          title={`${caught.status}.`}
          tagline={caught.statusText}
          excerpt={message}
          image="/images/not-found.jpg"
        />
      </Layout>
    </Document>
  )
}

const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error('Check your server terminal output', error)

  return (
    <Document title="Error!">
      <Layout>
        <Entry
          title="Error!"
          excerpt="There was an uncaught exception in your application. Check the browser
          console and/or the server console to inspect the error."
          image="/images/not-found.jpg"
          html={`<pre class="text-base leading-7 whitespace-normal"><span class="px-1 py-px font-sans text-sm font-medium uppercase rounded-sm text-primary-900 bg-primary-500">Error</span> <span class="block mt-2">${error.message}</span></pre>`}
        />
      </Layout>
    </Document>
  )
}

export default App
export { CatchBoundary, ErrorBoundary, links, meta }
