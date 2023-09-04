// Alternate solution: https://github.com/edmundhung/remix-guide/blob/main/app/helpers.ts#L7

export type Metadata = Record<string, any>

function cleanMeta(meta: Array<Metadata>): Array<Metadata> {
  return meta.filter((entry) => {
    const value = entry.content ?? entry.title ?? ''
    return value && value.trim() !== ''
  })
}

export function deriveMetaFromMetadata(metadata: Metadata): Array<Metadata> {
  return cleanMeta([
    { name: 'description', content: metadata.description },
    { property: 'author', content: metadata.author },
    { property: 'image', content: metadata.image },
    { property: 'keywords', content: metadata.tags?.join(', ') },
    { title: metadata.title },
  ])
}

interface EnhanceMetaOptions {
  author: string
  origin: string
  pathname: string
  siteName: string
  twitterCard: string
  twitterSite: string
  type: string
}

export function createMetaEnhancer(defaultOptions: Omit<EnhanceMetaOptions, 'pathname'>) {
  return (meta: Array<Metadata>, options: Partial<EnhanceMetaOptions> = {}): Array<Metadata> => {
    const allOptions = { ...defaultOptions, ...options }
    const { author, origin, pathname, siteName, twitterCard, twitterSite, type } = allOptions

    const metaAuthor = meta.find((entry) => entry.property === 'author')?.content || ''
    const metaDescription = meta.find((entry) => entry.name === 'description')?.content || ''
    const metaImage = meta.find((entry) => entry.property === 'image')?.content || ''
    const metaTitle = meta.find((entry) => entry.title)?.title || ''

    const title = metaTitle ? `${metaTitle} — ${siteName}` : siteName
    const url = pathname === '/' ? origin : `${origin}${pathname}`

    return cleanMeta([
      { title: title },
      { property: 'author', content: metaAuthor ?? author },

      { property: 'og:description', content: metaDescription },
      { property: 'og:image', content: metaImage },
      { property: 'og:site_name', content: siteName },
      { property: 'og:title', content: title },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url },

      { property: 'twitter:card', content: twitterCard },
      { property: 'twitter:description', content: metaDescription },
      { property: 'twitter:image', content: metaImage },
      { property: 'twitter:site', content: twitterSite },
      { property: 'twitter:title', content: title },
    ])
  }
}

export const enhanceMeta = createMetaEnhancer({
  author: 'Luke McDonald',
  origin: 'https://lukemcdonald.com',
  siteName: 'Luke McDonald',
  twitterCard: 'summary',
  twitterSite: '@thelukemcdonald',
  type: 'website',
})
