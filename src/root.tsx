import React, { FC } from 'react'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix'
import type { MetaFunction, LinksFunction } from 'remix'
import styles from './assets/css/tailwind.css'

export const meta: MetaFunction = () => {
  return { title: 'Luke McDonald' }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
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

interface LayoutProps {
  children: JSX.Element
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header>
        <nav>
          <Link to="/work/">Work</Link>
          <Link to="/play/">Play</Link>
          <Link to="/i-am-a/">Live</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>{new Date().getFullYear()}</footer>
    </div>
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
