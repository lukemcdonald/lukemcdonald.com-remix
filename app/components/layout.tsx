import clsx from 'clsx'
import { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { Header } from './header'
import { Image } from './image'
import { Main } from './main'
import { ModeSelect } from './mode-select'
import { defaults as themeSelectDefaults, ThemeSelect } from './theme-select'
import type { ThemeSelectData } from './theme-select'

function getOverlayColor({ mode, theme }: ThemeSelectData) {
  if (mode === 'dark') {
    return theme?.label === 'Gray' ? 'bg-primary-900' : 'bg-black'
  }

  return ''
}

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [mode] = useLocalStorageState('mode', { defaultValue: themeSelectDefaults.mode })
  const [theme] = useLocalStorageState('theme', { defaultValue: themeSelectDefaults.theme })
  const [currentMode, setCurrentMode] = useState(themeSelectDefaults.mode)
  const overlayColorArgs = {
    mode: currentMode,
    theme,
  }

  useEffect(() => {
    setCurrentMode(mode)
  }, [mode])

  return (
    <div className={clsx('lg:grid', getOverlayColor(overlayColorArgs))}>
      <Image
        className={clsx(
          'absolute left-1/2 top-1/2 hidden h-full max-h-screen w-full -translate-x-1/2 -translate-y-1/2 transform overflow-hidden object-cover blur-sm grayscale lg:block',
          currentMode === 'dark' ? 'opacity-30 mix-blend-hard-light' : 'opacity-20'
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
