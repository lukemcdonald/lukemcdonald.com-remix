// Alternate solution: https://github.com/edmundhung/remix-guide/blob/main/app/helpers.ts#L7

export type Metadata = Record<string, any>

function clearMeta(meta: Record<string, string>): Record<string, string> {
  const entries = Object.entries(meta).filter(
    ([_, value]) => typeof value !== 'undefined' && value.trim() !== '',
  )

  return Object.fromEntries(entries)
}

export function deriveMetaFromMetadata(
  metadata: Metadata,
): Record<string, string> {
  return clearMeta({
    title: metadata.title,
    description: metadata.description,
    image: metadata.image,
    author: metadata.author,
    keywords: metadata.tags?.join(', '),
  })
}

interface EnhanceMetaOptions {
  siteName: string
  baseUrl: string
  pathname: string
  author: string
  type: string
  twitterCard: string
  twitterSite: string
}

export function createMetaEnhancer(
  defaultOptions: Omit<EnhanceMetaOptions, 'pathname'>,
) {
  return (
    meta: Record<string, string>,
    options: Partial<EnhanceMetaOptions> = {},
  ): Record<string, string> => {
    const {
      siteName,
      baseUrl,
      pathname,
      author,
      type,
      twitterCard,
      twitterSite,
    } = { ...defaultOptions, ...options }

    const title = meta.title ? `${meta.title} — ${siteName}` : siteName
    const url = pathname === '/' ? baseUrl : `${baseUrl}${pathname}`

    return clearMeta({
      ...meta,
      title,
      author: meta.author ?? author,
      'og:title': title,
      'og:description': meta.description,
      'og:image': meta.image,
      'og:type': type,
      'og:site_name': siteName,
      'og:url': url,
      'twitter:card': twitterCard,
      'twitter:site': twitterSite,
      'twitter:title': title,
      'twitter:description': meta.description,
      'twitter:image': meta.image,
    })
  }
}

export const enhanceMeta = createMetaEnhancer({
  siteName: 'Luke McDonald',
  baseUrl: 'https://lukemcdonald.com',
  author: 'Luke McDonald',
  type: 'website',
  twitterCard: 'summary',
  twitterSite: '@thelukemcdonald',
})
