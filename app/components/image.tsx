import type { ImageProps } from '~/types'
import { getImageBuilder, getImgProps } from '~/utils/images'

export function Image({
  className,
  src: id,
  alt,
  widths = [],
  sizes = ['100vw'],
  ...rest
}: ImageProps) {
  return (
    /* eslint-disable jsx-a11y/alt-text */
    <img
      className={className}
      decoding="async"
      {...getImgProps(getImageBuilder({ id, alt }), {
        widths,
        sizes,
      })}
      {...rest}
    />
  )
}
