import clsx from 'clsx'

import { getImgProps, images } from '~/utils/images'
import Header from '~/components/header'
import Main from '~/components/main'

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="lg:grid">
      <img
        {...getImgProps(images.landscapeTreeFog, {
          widths: [750, 1080, 1600],
          sizes: ['100vw'],
        })}
        className="absolute hidden object-cover w-full h-full max-h-screen overflow-hidden transform -translate-x-1/2 -translate-y-1/2 opacity-20 lg:block left-1/2 top-1/2 grayscale"
        style={{
          gridArea: '1/1',
        }}
      />

      <div
        className="lg:bg-shadow-lg place-items-center text-primary-900 lg:relative lg:flex lg:items-center lg:justify-center lg:min-h-screen"
        style={{
          gridArea: '1/1',
        }}
      >
        <div
          className={clsx(
            'site',
            'bg-white m-auto relative lg:max-w-screen-xl lg:w-11/12 lg:max-h-site',
          )}
        >
          <Header />
          <Main>{children}</Main>
        </div>
      </div>
    </div>
  )
}
