import clsx from 'clsx'

import EntryHeader from '~/components/entry/header'
import EntryNav from '~/components/entry/nav'
import EntryBody from '~/components/entry/body'

import type { ImageBuilder } from '~/utils/images'

export interface EntryProps {
  html?: string
  image?: Pick<ImageBuilder, 'id' | 'alt'>
  description?: string
  subtitle?: string
  title: string
}

export default function Entry({
  html,
  image,
  description,
  subtitle,
  title,
}: EntryProps) {
  return (
    <article className={clsx('entry', 'w-full overflow-hidden bg-primary-800')}>
      <EntryHeader
        title={title}
        subtitle={subtitle}
        description={description}
      />
      <EntryNav />
      {(html || image) && <EntryBody html={html || ''} image={image} />}
    </article>
  )
}
