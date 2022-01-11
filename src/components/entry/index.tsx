import React from 'react'
import clsx from 'clsx'

import EntryHeader from '~/components/entry/header'
import EntryNav from '~/components/entry/nav'
import EntryBody from '~/components/entry/body'

export interface EntryProps {
  date?: string
  html?: string
  image?: string
  subtitle?: string
  tagline?: string
  title: string
}

export default function Entry({
  date,
  html,
  image,
  subtitle,
  tagline,
  title,
}: EntryProps) {
  return (
    <article className={clsx('entry', 'w-full overflow-hidden')}>
      <EntryHeader
        title={title}
        tagline={tagline}
        subtitle={subtitle}
        date={date}
      />

      <EntryNav />

      {(html || image) && <EntryBody html={html} image={image} />}
    </article>
  )
}
