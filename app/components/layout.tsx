import clsx from 'clsx'

import { Header } from './header'
import { Image } from './image'
import { Main } from './main'
import { ModeSelect } from './mode-select'
import { ThemeSelect } from './theme-select'
import type { ThemeData } from '~/hooks/use-theme'
import { useTheme } from '~/hooks/use-theme'

function getOverlayColor({ mode, theme }: ThemeData) {
  if (mode.value !== 'dark') {
    return 'bg-primary-50'
  }

  const themeKey = theme?.label.toLowerCase()

  switch (themeKey) {
    case 'gray':
      return 'bg-primary-900'
    default:
      return 'bg-black'
  }
}

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data } = useTheme()

  return (
    <div className={clsx('lg:grid', getOverlayColor(data))}>
      <Image
        className={clsx(
          'absolute left-1/2 top-1/2 hidden h-full max-h-screen w-full -translate-x-1/2 -translate-y-1/2 transform overflow-hidden object-cover blur-sm grayscale lg:block',
          data.mode.value === 'dark' ? 'opacity-30 mix-blend-hard-light' : 'opacity-20'
        )}
        src="https://res.cloudinary.com/lukemcdonald/image/upload/v1642448417/lukemcdonald-com/landscape-tree-fog_jz6tjg.jpg"
        alt="Tree fog background"
        widths={[750, 1080, 1600]}
        style={{ gridArea: '1/1' }}
      />

      <div className="fixed top-5 right-5 z-[100] hidden md:flex md:items-center">
        <ModeSelect />
        <ThemeSelect />
      </div>

      <div
        className="place-items-center text-primary-900 lg:relative lg:flex lg:min-h-screen lg:items-center lg:justify-center "
        style={{ gridArea: '1/1' }}
      >
        <div
          className={clsx(
            'site',
            'relative m-auto bg-white lg:max-h-site lg:w-11/12 lg:max-w-screen-xl lg:shadow-2xl'
          )}
        >
          <Header />
          <Main>{children}</Main>
        </div>
      </div>
    </div>
  )
}

export { Layout }
