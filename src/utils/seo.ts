export function getSocialMetas({
  url,
  title = 'Helping people make the world a better place through quality software',
  description = 'Make the world better with software',
  image = '',
  keywords = '',
}: {
  origin: string
  image?: string
  url: string
  title?: string
  description?: string
  keywords?: string
}) {
  return {
    title: title ? `${title} — Luke McDonald` : 'Luke McDonald',
    description,
    keywords,
    image,
    'og:url': url,
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'twitter:card': image ? 'summary_large_image' : 'summary',
    'twitter:creator': '@_lukemcdonald_',
    'twitter:site': '@_lukemcdonald_',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:alt': title,
  }
}
