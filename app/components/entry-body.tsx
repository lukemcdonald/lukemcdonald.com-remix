import clsx from 'clsx'

import type { EntryProps } from '~/types'
import { Image } from '~/components/image'

export function EntryBody({
  html = '',
  image,
  imageAlt = 'Content image',
}: EntryProps) {
  return (
    <div className="entry__body bg-primary-500">
      {image && (
        <figure className={clsx('entry__media', 'bg-primary-500 relative')}>
          <Image
            className="xs:object-cover block h-full w-full"
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
            'bg-primary-900 xs:px-10 relative flex flex-col justify-center px-5 py-10 text-lg leading-normal text-white',
          )}
          style={{ wordBreak: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  )
}
