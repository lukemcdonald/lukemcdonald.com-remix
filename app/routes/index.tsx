import type { LoaderFunction, MetaFunction } from 'remix'
import { json, useLoaderData } from 'remix'

import type { Content, RequestInfo } from '~/types'
import { getContent } from '~/modules/content'
import { enhanceMeta } from '~/utils/meta'
import { Entry } from '~/components/entry'
import { pageNotFound } from '~/utils/misc'

interface LoaderData {
  page: Content
}

export const meta: MetaFunction = ({ parentsData }) => {
  const requestInfo = (parentsData.root as RequestInfo | undefined)?.requestInfo

  const meta = {
    description: `I'm Luke, a christian, husband, father and wrestling coach living in beautiful Eastern Iowa. My tent making is as a full-stack developer with an eye for design.`,
    keywords: [
      'christian',
      'coach',
      'web',
      'engineer',
      'developer',
      'react',
    ].join(', '),
  }

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
