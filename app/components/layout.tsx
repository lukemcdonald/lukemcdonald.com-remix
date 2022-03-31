import clsx from 'clsx'

import { Header } from '~/components/header'
import { Image } from '~/components/image'
import { Main } from '~/components/main'

export function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="lg:grid">
      <Image
        className="absolute left-1/2 top-1/2 hidden h-full max-h-screen w-full -translate-x-1/2 -translate-y-1/2 transform overflow-hidden object-cover opacity-20 grayscale lg:block"
        src="https://res.cloudinary.com/lukemcdonald/image/upload/v1642448417/lukemcdonald-com/landscape-tree-fog_jz6tjg.jpg"
        alt="Tree fog background"
        widths={[750, 1080, 1600]}
        style={{
          gridArea: '1/1',
        }}
      />

      <div
        className="lg:bg-shadow-lg text-primary-900 place-items-center lg:relative lg:flex lg:min-h-screen lg:items-center lg:justify-center"
        style={{
          gridArea: '1/1',
        }}
      >
        <div
          className={clsx(
            'site',
            'lg:max-h-site relative m-auto bg-white lg:w-11/12 lg:max-w-screen-xl',
          )}
        >
          <Header />
          <Main>{children}</Main>
        </div>
      </div>
    </div>
  )
}
