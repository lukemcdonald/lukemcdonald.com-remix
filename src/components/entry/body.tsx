import React from 'react'
import clsx from 'clsx'

import { getImageBuilder, getImgProps, ImageBuilder } from '~/utils/images'

interface EntryBodyProps {
  image?: Pick<ImageBuilder, 'id' | 'alt'>
  html?: string
}

export default function EntryBody({ image, html }: EntryBodyProps) {
  const [img, setImg] = React.useState({ id: '', alt: '' })

  React.useEffect(() => {
    if (image) setImg(image)
  }, [image])

  return (
    <div className="entry__body bg-primary-500">
      {img?.id && (
        <figure className={clsx('entry__media', 'bg-primary-500 relative')}>
          <img
            {...getImgProps(getImageBuilder(img), {
              widths: [750, 1024],
              sizes: ['100vw'],
            })}
            className="block lg:pin-t lg:pin-l xs:w-full xs:h-full xs:object-cover lg:absolute lg:w-full lg:h-full grayscale"
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
