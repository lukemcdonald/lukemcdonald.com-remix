import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react'

import { Entry } from '~/components/entry'
import { Layout } from '~/components/layout'
import type { EntryProps, RequestInfo } from '~/types'
import { enhanceMeta } from '~/utils/meta'
import { getErrorMessage, getRequestInfo } from '~/utils/misc'

import styles from '~/styles/tailwind.css'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const requestInfo = (data as RequestInfo | undefined)?.requestInfo

  const meta = [
    {
      property: 'google-site-verfication',
      content: '4jMDBbKyVQPMqqE3YYqw2vabnA3CR_uU9l2sOtRRmjM',
    },
    {
      property: 'theme-color',
      content: '#122023',
    },
    {
      property: 'image',
      content: `${requestInfo?.origin}/images/seo-banner.png`,
    },
  ]

  return enhanceMeta(meta, {
    baseUrl: requestInfo?.origin,
    pathname: requestInfo?.pathname,
  })
}

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles,
  },
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
    rel: 'mask-icon',
    href: '/favicons/favicon.svg',
    color: '#122023',
  },
]

export const loader: LoaderFunction = async ({ request }) => {
  // Force https
  let url = new URL(request.url)
  const hostname = url.hostname
  const proto = request.headers.get('X-Forwarded-Proto') ?? url.protocol

  url.host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host') ?? url.host
  url.protocol = 'https:'

  if (proto === 'http' && hostname !== 'localhost') {
    return redirect(url.toString(), {
      headers: {
        'X-Forwarded-Proto': 'https',
      },
    })
  }

  if (url.host.includes('www.')) {
    return redirect(url.toString().replace('www.', ''), {
      headers: {
        'X-Forwarded-Proto': 'https',
      },
    })
  }

  return json<RequestInfo>({
    ...getRequestInfo(request),
  })
}

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
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

export function ErrorBoundary() {
  const error = useRouteError()

  const entryData: EntryProps = {
    title: 'Error',
    description: `Unknown error.`,
    html: '',
    image:
      'https://res.cloudinary.com/lukemcdonald/image/upload/v1642448418/lukemcdonald-com/not-found_y5jbrf.jpg',
    imageAlt: 'Little Carly coding.',
  }

  function buildErrorHtml(errorMessage: string) {
    if (!errorMessage) {
      return ''
    }

    return `<pre class="text-base leading-7 whitespace-normal"><span class="px-1 py-px font-sans text-sm font-medium uppercase rounded-sm text-primary-900 bg-primary-500">Error</span> <span class="block mt-2">${errorMessage}</span></pre>`
  }

  if (isRouteErrorResponse(error)) {
    const entryErrorData = {
      ...entryData,
      title: error.status.toString(),
      subtitle: error.statusText,
      html: buildErrorHtml(error.data),
    }

    switch (error.status) {
      case 401:
        entryErrorData.description = `Oops! Looks like you tried to visit a page that you do not have access to.`
        break
      case 404:
        entryErrorData.description = `Oops! Looks like you tried to visit a page that does not exist.`
        break
      default:
        throw new Error(error.data || error.statusText)
    }

    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <Layout>
          <Entry data={entryErrorData} />
        </Layout>
      </Document>
    )
  }

  if (error instanceof Error) {
    const entryErrorData = {
      ...entryData,
      title: 'Error',
      description:
        'There was an uncaught exception in your application. Check the browser or server console to inspect the error.',
      html: buildErrorHtml(getErrorMessage(error)),
    }

    return (
      <Document title={entryErrorData.title}>
        <Layout>
          <Entry data={entryErrorData} />
        </Layout>
      </Document>
    )
  }

  return (
    <Document title={entryData.title}>
      <Layout>
        <Entry data={entryData} />
      </Layout>
    </Document>
  )
}
