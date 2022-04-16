import { RequestInfo } from '~/types'

function getDomainUrl(request: Request) {
  const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')

  if (!host) {
    throw new Error('Could not determine domain URL.')
  }

  const protocol = host.includes('localhost') ? 'http' : 'https'

  return `${protocol}://${host}`
}

export function getRequestInfo(request: Request): RequestInfo {
  return {
    requestInfo: {
      origin: getDomainUrl(request),
      pathname: new URL(request.url).pathname,
    },
  }
}

export function getErrorMessage(error: unknown) {
  if (typeof error === 'string') {
    return error
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Unknown Error'
}

export function notFound(data?: string, statusText?: string): Response {
  const dataText = data || 'Not Found!'

  return new Response(dataText, { status: 404, statusText })
}

export function pageNotFound(path?: string) {
  return notFound(`"/${path}" is not a page on lukemcdonald.com.`)
}
