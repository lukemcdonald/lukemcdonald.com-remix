import clsx from 'clsx'

import type { EntryProps } from '~/types'
import EntryHeader from '~/components/entry-header'
import EntryBody from '~/components/entry-body'
import ContactInfo from '~/components/contact-info'

export default function Entry({ data }: { data: EntryProps }) {
  return (
    <article className={clsx('entry', 'bg-primary-800 w-full overflow-hidden')}>
      <EntryHeader
        title={data.title}
        subtitle={data.subtitle}
        description={data.description}
      />

      <ContactInfo />

      <EntryBody
        html={data.html}
        image={data.image}
        imageAlt={data.imageAlt || data.title}
      />
    </article>
  )
}
