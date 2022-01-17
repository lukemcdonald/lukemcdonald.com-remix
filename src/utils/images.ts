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

const createImages = <
  ImageType extends Record<string, { id: string; alt: string }>,
>(
  images: ImageType,
) => {
  const imageBuilders: Record<string, ImageBuilder> = {}
  for (const [name, { id, alt }] of Object.entries(images)) {
    imageBuilders[name] = getImageBuilder({ id, alt })
  }
  return imageBuilders as { [Name in keyof ImageType]: ImageBuilder }
}

function getImageBuilder({
  id,
  alt = '',
}: {
  id: string
  alt: string
}): ImageBuilder {
  invariant(id, `Expected typeof id of string but instead got ${id}`)

  const cloudinaryId =
    typeof id === 'string' && id.includes('https://res.cloudinary.com')
      ? extractPublicId(id)
      : id

  function imageBuilder(transformations?: TransformerOption) {
    return buildImageUrl(cloudinaryId, { transformations })
  }

  imageBuilder.alt = alt
  imageBuilder.id = cloudinaryId
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
  },
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
      .map(width =>
        [
          imageBuilder({
            quality: 'auto',
            format: 'auto',
            ...transformations,
            resize: { width, ...transformations?.resize },
          }),
          `${width}w`,
        ].join(' '),
      )
      .join(', '),
    sizes: sizes.join(', '),
  }
}

const images = createImages({
  logo: {
    id: 'lukemcdonald-com/logo_vcvrzs',
    alt: 'Luke Mcdonald Logo',
  },
  landscapeTreeFog: {
    id: 'lukemcdonald-com/landscape-tree-fog_jz6tjg',
    alt: 'Tree fog background',
  },
  landscapeTreeTops: {
    id: 'lukemcdonald-com/landscape-tree-tops_upwt7v',
    alt: 'Tree fog background',
  },
  landscapeWater: {
    id: 'lukemcdonald-com/landscape-water_zno0rf',
    alt: 'Water background',
  },
})

const bgImages = {
  treeFog: images.landscapeTreeFog,
  treeTops: images.landscapeTreeTops,
  water: images.landscapeWater,
}

export { images, getImgProps, getImageBuilder }
export type { ImageBuilder }
