import clsx from 'clsx'

import type { EntryProps } from '~/types'
import { Image } from '~/components/image'

export function EntryBody({ html = '', image, imageAlt = 'Content image' }: EntryProps) {
  return (
    <div className="entry__body bg-primary-900">
      {image && (
        <figure className={clsx('entry__media', 'relative bg-primary-500 mix-blend-lighten')}>
          <Image
            className="block h-full w-full grayscale xs:object-cover"
            src={image}
            alt={imageAlt}
            widths={[750, 1024]}
          />
        </figure>
      )}

      {html && (
        <div
          className={clsx(
            'entry__content',
            'relative flex flex-col justify-center bg-primary-900 px-5 py-10 text-lg leading-normal text-white xs:px-10 break-words'
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  )
}
