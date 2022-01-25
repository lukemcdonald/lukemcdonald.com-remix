import React from 'react'
import clsx from 'clsx'

import { getImageBuilder, getImgProps } from '~/utils/images'
import type { EntryProps } from '~/types'

export default function EntryBody({
  html = '',
  image,
  imageAlt = 'Content image',
}: EntryProps) {
  return (
    <div className="entry__body bg-primary-500">
      {image && (
        <figure className={clsx('entry__media', 'bg-primary-500 relative')}>
          <img
            className="xs:object-cover block h-full w-full"
            {...getImgProps(getImageBuilder({ id: image, alt: imageAlt }), {
              widths: [750, 1024],
              sizes: ['100vw'],
            })}
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
