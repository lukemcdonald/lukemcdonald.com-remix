import React from 'react'
import clsx from 'clsx'

import type { EntryProps } from '~/components/entry'

export default function EntryBody({
  image,
  html,
}: Pick<EntryProps, 'image' | 'html'>) {
  return (
    <div className="entry__body bg-primary-500">
      {image && (
        <figure
          className={clsx(
            'entry__media',
            'bg-primary-500 relative fill-current',
          )}
        >
          <img
            src={image}
            className="block lg:pin-t lg:pin-l xs:w-full xs:h-full xs:object-cover lg:absolute lg:w-full lg:h-full"
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
