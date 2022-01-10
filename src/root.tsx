import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix'
import Layout from '~/components/layout'

import type { MetaFunction, LinksFunction } from 'remix'

import styles from './styles/tailwind.css'

export const meta: MetaFunction = () => {
  return { title: 'Luke McDonald' }
}

export const links: LinksFunction = () => {
  return [
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
    {
      rel: 'stylesheet',
      href: styles,
    },
  ]
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

interface DocumentProps {
  children: JSX.Element
}

function Document({ children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
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

interface ErrorBoundaryProps {
  error: {
    message: string
  }
}

export function ErrorBoundary({ error }: ErrorBoundaryProps) {
  return (
    <Document>
      <Layout>
        <div className="max-w-2xl p-4 prose-sm prose bg-error-50 text-error-800">
          <h3 className="font-medium">Error:</h3>
          <p className="">{error.message}</p>
        </div>
      </Layout>
    </Document>
  )
}
