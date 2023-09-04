import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

import { Entry } from '~/components/entry'
import { getContent } from '~/modules/content'
import type { Content, RequestInfo } from '~/types'
import { enhanceMeta } from '~/utils/meta'
import { pageNotFound } from '~/utils/misc'

interface LoaderData {
  page: Content
}

export const meta: V2_MetaFunction<typeof loader> = ({ data, matches }) => {
  const parentsData = matches.flatMap((match) => match.data)
  const parentRequest = parentsData.find((data) => data.requestInfo) satisfies RequestInfo

  const meta = [
    {
      title: data?.page?.title,
    },
    {
      name: 'description',
      content: data?.page?.description,
    },
  ]

  const options = {
    origin: parentRequest.requestInfo.origin,
    pathname: parentRequest.requestInfo.pathname,
  }

  return enhanceMeta(meta, options)
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
