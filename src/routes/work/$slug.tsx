import { json, useLoaderData } from 'remix'
import invariant from 'tiny-invariant'

import { getSeoMeta } from '~/utils/seo'
import { getContent } from '~/modules/content'

import type { LoaderFunction, MetaFunction } from 'remix'
import type { Content } from '~/modules/content'
import Entry from '~/components/entry'

interface RouteData {
  work: Content
}

const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'Expected params.slug')

  const work = await getContent(`work/${params.slug}`)

  if (!work || work.draft) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  const data: RouteData = { work }

  return json(data)
}

const meta: MetaFunction = ({ data }: { data: RouteData }) => {
  if (!data?.work) return getSeoMeta({ title: 'Not Found' })

  const { work } = data

  return getSeoMeta({
    title: `${work.title}`,
    description: `${work?.excerpt ? work.excerpt : ''}`,
  })
}

function WorkSlug() {
  const { work } = useLoaderData<RouteData>()

  return (
    <Entry
      title={work.title}
      excerpt={work.excerpt}
      html={work.html}
      image={work.image}
    />
  )
}

export default WorkSlug
export { loader, meta }
