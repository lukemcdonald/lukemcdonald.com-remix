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
            className="block w-full h-full xs:object-cover"
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
            'bg-primary-900 flex flex-col justify-center px-5 py-10 text-lg text-white relative leading-normal xs:px-10',
          )}
          style={{ wordBreak: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  )
}
