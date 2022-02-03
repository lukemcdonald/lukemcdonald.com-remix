import type { LoaderFunction, MetaFunction } from 'remix'
import { json, useLoaderData } from 'remix'
import invariant from 'tiny-invariant'

import type { Content, RequestInfo } from '~/types'
import { getContent } from '~/modules/content'
import { enhanceMeta } from '~/utils/meta'
import { pageNotFound } from '~/utils/misc'
import { Entry } from '~/components/entry'

interface LoaderData {
  page: Content
}

export const meta: MetaFunction = ({ data, parentsData }) => {
  const requestInfo = (parentsData.root as RequestInfo | undefined)?.requestInfo

  const meta = {
    title: data?.page?.title,
    description: data?.page?.description,
  }

  return enhanceMeta(meta, {
    baseUrl: requestInfo?.origin,
    pathname: requestInfo?.pathname,
  })
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.content, 'Expected params.content')
  invariant(params.slug, 'Expected params.slug')

  const page = await getContent({
    contentDir: params.content,
    slug: params.slug,
  })

  if (page?.draft) {
    throw pageNotFound(page.filename)
  }

  return json<LoaderData>({ page })
}

export default function ContentSlug() {
  const { page } = useLoaderData<LoaderData>()
  return <Entry data={page} />
}
