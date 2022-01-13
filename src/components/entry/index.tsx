import React from 'react'
import clsx from 'clsx'

import EntryHeader from '~/components/entry/header'
import EntryNav from '~/components/entry/nav'
import EntryBody from '~/components/entry/body'

export interface EntryProps {
  html?: string
  image?: string
  excerpt?: string
  tagline?: string
  title: string
}

export default function Entry({
  html,
  image,
  excerpt,
  tagline,
  title,
}: EntryProps) {
  return (
    <article className={clsx('entry', 'w-full overflow-hidden bg-primary-800')}>
      <EntryHeader title={title} tagline={tagline} excerpt={excerpt} />
      <EntryNav />
      {(html || image) && <EntryBody html={html} image={image} />}
    </article>
  )
}
