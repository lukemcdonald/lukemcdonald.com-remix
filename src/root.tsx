import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix'

import type {
  ErrorBoundaryComponent,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from 'remix'

import type { EntryProps, RequestInfo } from '~/types'
import { enhanceMeta } from '~/utils/meta'
import { getRequestInfo, getErrorMessage } from '~/utils/misc'
import { Entry } from '~/components/entry'
import { Layout } from '~/components/layout'

import styles from '~/styles/tailwind.css'

export const meta: MetaFunction = ({ data }) => {
  const requestInfo = (data as RequestInfo | undefined)?.requestInfo

  const meta = {
    image: `${requestInfo?.origin}/images/seo-banner.png`,
    'google-site-verification': '4jMDBbKyVQPMqqE3YYqw2vabnA3CR_uU9l2sOtRRmjM',
    'theme-color': '#7dc149',
  }

  return enhanceMeta(meta, {
    baseUrl: requestInfo?.origin,
    pathname: requestInfo?.pathname,
  })
}

export const links: LinksFunction = () => [
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
  {
    rel: 'mask-icon',
    href: '/favicons/favicon.svg',
    color: '#15824e',
  },
]

export const loader: LoaderFunction = async ({ request }) => {
  // Force https
  let url = new URL(request.url)
  const hostname = url.hostname
  const proto = request.headers.get('X-Forwarded-Proto') ?? url.protocol

  url.host =
    request.headers.get('X-Forwarded-Host') ??
    request.headers.get('host') ??
    url.host
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
        <meta name="viewport" content="width=device-width,initial-scale=1" />
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

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

export function CatchBoundary() {
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
          data={
            {
              title: caught.status.toString(),
              subtitle: caught.statusText,
              description: message,
              image:
                'https://res.cloudinary.com/lukemcdonald/image/upload/v1642448418/lukemcdonald-com/not-found_y5jbrf.jpg',
              imageAlt: 'Little Carly coding.',
              html:
                caught?.data &&
                `<pre class="text-base leading-7 whitespace-normal"><span class="px-1 py-px font-sans text-sm font-medium uppercase rounded-sm text-primary-900 bg-primary-500">Error</span> <span class="block mt-2">${caught.data}</span></pre>`,
            } as EntryProps
          }
        />
      </Layout>
    </Document>
  )
}

export function ErrorBoundry({ error }: { error: ErrorBoundaryComponent }) {
  console.error('Check your server terminal output.')

  return (
    <Document title="Error!">
      <Layout>
        <Entry
          data={
            {
              title: 'Error!',
              description: `There was an uncaught exception in your application. Check the browser or server console to inspect the error.`,
              image:
                'https://res.cloudinary.com/lukemcdonald/image/upload/v1642448418/lukemcdonald-com/not-found_y5jbrf.jpg',
              imageAlt: 'Little Carly coding.',
              html: `<pre class="text-base leading-7 whitespace-normal"><span class="px-1 py-px font-sans text-sm font-medium uppercase rounded-sm text-primary-900 bg-primary-500">Error</span> <span class="block mt-2">${getErrorMessage(
                error,
              )}</span></pre>`,
            } as EntryProps
          }
        />
      </Layout>
    </Document>
  )
}
