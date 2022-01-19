import type { LoaderFunction, MetaFunction } from 'remix'
import { json, useLoaderData } from 'remix'
import invariant from 'tiny-invariant'

import type { Content, RequestInfo } from '~/types'
import { getContent } from '~/modules/content'
import { enhanceMeta } from '~/utils/meta'
import Entry from '~/components/entry'

interface LoaderData {
  page: Content
}

export const meta: MetaFunction = ({ data, parentsData }) => {
  if (!data) {
    return { title: 'Not Found!' }
  }

  const { requestInfo } = parentsData.root as RequestInfo

  const meta = {
    title: data.page.title,
    description: data.page.description,
  }

  return enhanceMeta(meta, {
    baseUrl: requestInfo.origin,
    pathname: requestInfo.pathname,
  })
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.content, 'Expected params.content')
  invariant(params.slug, 'Expected params.slug')

  const page = await getContent({
    contentDir: params.content,
    slug: params.slug,
  })

  if (!page || page.draft) {
    throw new Response('Not Found', { status: 404 })
  }

  return json<LoaderData>({ page })
}

export default function ContentSlug() {
  const { page } = useLoaderData<LoaderData>()
  return <Entry data={page} />
}
