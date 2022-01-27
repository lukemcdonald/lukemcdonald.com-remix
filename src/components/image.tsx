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
    <img
      className={className}
      {...getImgProps(getImageBuilder({ id, alt }), {
        widths,
        sizes,
      })}
      {...rest}
    />
  )
}
