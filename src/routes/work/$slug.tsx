import { json, useLoaderData } from 'remix'
import invariant from 'tiny-invariant'

import { getSeoMeta } from '~/utils/seo'
import { getWork } from '~/modules/work'

import type { LoaderFunction, MetaFunction } from 'remix'
import type { Work } from '~/modules/work'

interface RouteData {
  work: Work
}

const meta: MetaFunction = ({ data }: { data: RouteData }) => {
  const { work } = data

  return getSeoMeta({
    title: `${work.title}`,
    description: `${work?.subtitle ? work.subtitle : ''}`,
  })
}

const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'Expected params.slug')

  const work = await getWork(params.slug)

  if (!work || work.draft) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  const data: RouteData = { work }

  return json(data)
}

function WorkSlug() {
  const { work } = useLoaderData<RouteData>()

  return (
    <article>
      <h1>{work.title}</h1>
      <img src={work.image} alt={work.title} />
      <div dangerouslySetInnerHTML={{ __html: work.html }} />
    </article>
  )
}

export default WorkSlug
export { meta, loader }
