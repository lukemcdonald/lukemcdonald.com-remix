import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Entry } from '~/components/entry'
import { getContent } from '~/modules/content'
import type { Content, RequestInfo } from '~/types'
import { enhanceMeta } from '~/utils/meta'
import { pageNotFound } from '~/utils/misc'

interface LoaderData {
  page: Content
}

export const meta: V2_MetaFunction<typeof loader> = ({ parentsData }) => {
  const requestInfo = (parentsData.root as RequestInfo | undefined)?.requestInfo

  const meta = [
    {
      name: 'description',
      content: `I'm Luke, a christian, husband, father and wrestling coach living in beautiful Eastern Iowa. My tent making is as a full-stack developer with an eye for design.`,
    },
    {
      name: 'keywords',
      content: ['christian', 'coach', 'web', 'engineer', 'developer', 'react'].join(', '),
    },
  ]

  return enhanceMeta(meta, {
    baseUrl: requestInfo?.origin,
    pathname: requestInfo?.pathname,
  })
}

export const loader: LoaderFunction = async ({ params }) => {
  const page = await getContent({ slug: 'index' })

  if (page?.draft) {
    throw pageNotFound(page.filename)
  }

  return json<LoaderData>({ page })
}

export default function Index() {
  const { page } = useLoaderData<LoaderData>()

  return <Entry data={page} />
}
