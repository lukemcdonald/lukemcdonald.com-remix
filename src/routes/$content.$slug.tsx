import { json, useLoaderData } from 'remix'
import invariant from 'tiny-invariant'

import { getSeoMeta } from '~/utils/seo'
import { getContent } from '~/modules/content'

import type { LoaderFunction, MetaFunction } from 'remix'
import type { Content } from '~/modules/content'
import Entry from '~/components/entry'

interface RouteData {
  page: Content
}

const loader: LoaderFunction = async ({ params }) => {
  invariant(params.content, 'Expected params.content')
  invariant(params.slug, 'Expected params.slug')

  const page = await getContent(`${params.content}/${params.slug}`)

  if (!page || page.draft) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  const data: RouteData = { page }

  return json(data)
}

const meta: MetaFunction = ({ data }: { data: RouteData }) => {
  if (!data?.page) return getSeoMeta({ title: 'Not Found' })

  const { page } = data

  return getSeoMeta({
    title: `${page.title}`,
    description: `${page?.excerpt ? page.excerpt : ''}`,
  })
}

function ContentSlug() {
  const { page } = useLoaderData<RouteData>()

  return (
    <Entry
      title={page.title}
      excerpt={page.excerpt}
      html={page.html}
      image={page.image}
    />
  )
}

export default ContentSlug
export { loader, meta }
