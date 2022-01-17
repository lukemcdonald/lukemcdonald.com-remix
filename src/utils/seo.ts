import { initSeo } from 'remix-seo'

export const { getSeo, getSeoMeta, getSeoLinks } = initSeo({
  // Set defaults that will apply to routes w/o specific SEO tags
  title: 'Luke McDonald',
  titleTemplate: '%s — Luke McDonald',
  openGraph: {
    siteName: 'Luke McDonald',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    creator: 'thelukemcdonald',
    site: 'thelukemcdonald',
  },
})
