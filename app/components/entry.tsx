import clsx from 'clsx'

import { ContactInfo } from '~/components/contact-info'
import { EntryBody } from '~/components/entry-body'
import { EntryHeader } from '~/components/entry-header'
import type { EntryProps } from '~/types'

export function Entry({ data }: { data: EntryProps }) {
  return (
    <article
      className={clsx('entry', 'min-h-screen w-full overflow-hidden bg-primary-800', 'lg:min-h-0')}
    >
      <EntryHeader title={data.title} subtitle={data.subtitle} description={data.description} />

      <ContactInfo />

      <EntryBody html={data.html} image={data.image} imageAlt={data.imageAlt || data.title} />
    </article>
  )
}
