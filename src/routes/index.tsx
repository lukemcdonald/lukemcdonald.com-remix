import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'

import Entry from '~/components/entry'
import { getContent } from '~/modules/content'
import type { Content } from '~/modules/content'
import { getSeoMeta } from '~/utils/seo'

export const meta: MetaFunction = () => {
  return getSeoMeta({
    description:
      "A christian, husband, father and wrestling coach who's tent making is as a full-stack developer with an eye for design.",
  })
}

interface RouteData {
  page: Content
}

export const loader: LoaderFunction = async () => {
  const page = await getContent({ slug: 'index' })

  if (!page) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  const data: RouteData = { page }
  return data
}

export default function Index() {
  const { page } = useLoaderData()
  const imageObj = {
    id: page.image || '',
    alt: page.imageAlt || page.title || 'Content image',
  }

  return (
    <Entry
      title={page.title}
      excerpt={page.excerpt}
      html={page.html}
      image={imageObj}
    />
  )
}
