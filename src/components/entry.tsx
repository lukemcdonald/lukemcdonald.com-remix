import React from 'react'
import clsx from 'clsx'

import type { EntryProps, EntryImgProps } from '~/types'
import EntryHeader from '~/components/entry-header'
import ContactInfo from '~/components/contact-info'
import { getImageBuilder, getImgProps } from '~/utils/images'

export default function Entry({ data }: { data: EntryProps }) {
  const [imgProps, setImgProps] = React.useState<EntryImgProps>({
    alt: '',
    src: '',
    srcSet: '',
    sizes: '',
  })

  React.useEffect(() => {
    if (data.image) {
      const imgProps: EntryImgProps = getImgProps(
        getImageBuilder({
          id: data.image || '',
          alt: data.imageAlt || data.title || 'Content image',
        }),
        {
          widths: [750, 1024],
          sizes: ['100vw'],
        },
      )

      setImgProps(imgProps)
    }
  }, [data])

  return (
    <article className={clsx('entry', 'w-full overflow-hidden bg-primary-800')}>
      <EntryHeader
        title={data.title}
        subtitle={data.subtitle}
        description={data.description}
      />

      <ContactInfo />

      <div className="entry__body bg-primary-500">
        {imgProps?.src && (
          <figure className={clsx('entry__media', 'bg-primary-500 relative')}>
            <img
              className="block lg:pin-t lg:pin-l xs:w-full xs:h-full xs:object-cover lg:absolute lg:w-full lg:h-full"
              {...imgProps}
            />
          </figure>
        )}

        {data.html && (
          <div
            className={clsx(
              'entry__content',
              'bg-primary-900 flex flex-col justify-center px-5 py-10 text-lg text-white relative leading-normal xs:px-10',
            )}
            style={{ wordBreak: 'break-word' }}
            dangerouslySetInnerHTML={{ __html: data.html }}
          />
        )}
      </div>
    </article>
  )
}
