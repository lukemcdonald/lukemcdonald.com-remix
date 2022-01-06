import { useLoaderData } from 'remix'
import invariant from 'tiny-invariant'
import { getWork } from '~/modules/work'

import type { LoaderFunction } from 'remix'
import type { Work } from '~/modules/work'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'Expected params.slug')
  const work = await getWork(params.slug)

  if (!work || work.draft) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  return work
}

export default function PostSlug() {
  const work = useLoaderData<Work>()

  return (
    <article>
      <h1>{work.title}</h1>
      <img src={work.image} alt={work.title} />
      <div dangerouslySetInnerHTML={{ __html: work.html }} />
    </article>
  )
}
