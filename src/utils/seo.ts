export function getSocialMetas({
  url,
  title = 'Luke McDonald',
  description = 'Full-stack developer with an eye for design.',
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
    'google-site-verification': '4jMDBbKyVQPMqqE3YYqw2vabnA3CR_uU9l2sOtRRmjM',
    'og:url': url,
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:site_name': 'Luke McDonald',
    'twitter:card': image ? 'summary_large_image' : 'summary',
    'twitter:creator': '@_lukemcdonald_',
    'twitter:site': '@_lukemcdonald_',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:alt': title,
  }
}
