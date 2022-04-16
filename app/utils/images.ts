import invariant from 'tiny-invariant'
import type { TransformerOption } from '@cld-apis/types'
import { setConfig, buildImageUrl, extractPublicId } from 'cloudinary-build-url'

setConfig({
  cloudName: 'lukemcdonald',
})

type ImageBuilder = {
  (transformations?: TransformerOption): string
  alt: string
  id: string
}

function getImageBuilder({ id, alt = '' }: { id: string; alt: string }): ImageBuilder {
  invariant(id, `Expected typeof id of string but instead got ${id}`)

  const cloudinaryId =
    typeof id === 'string' && id.includes('https://res.cloudinary.com') ? extractPublicId(id) : id

  function imageBuilder(transformations?: TransformerOption) {
    return buildImageUrl(cloudinaryId, { transformations })
  }

  imageBuilder.id = cloudinaryId
  imageBuilder.alt = alt
  return imageBuilder
}

function getImgProps(
  imageBuilder: ImageBuilder,
  {
    widths,
    sizes,
    transformations,
  }: {
    widths: number[]
    sizes: string[]
    transformations?: TransformerOption
  }
) {
  const averageSize = Math.ceil(widths.reduce((a, s) => a + s) / widths.length)

  return {
    alt: imageBuilder.alt,
    src: imageBuilder({
      quality: 'auto',
      format: 'auto',
      fetchFormat: 'auto',
      ...transformations,
      resize: { width: averageSize, ...transformations?.resize },
    }),
    srcSet: widths
      .map((width) =>
        [
          imageBuilder({
            quality: 'auto',
            format: 'auto',
            ...transformations,
            resize: { width, ...transformations?.resize },
          }),
          `${width}w`,
        ].join(' ')
      )
      .join(', '),
    sizes: sizes.join(', '),
  }
}

export { getImgProps, getImageBuilder }
export type { ImageBuilder }
