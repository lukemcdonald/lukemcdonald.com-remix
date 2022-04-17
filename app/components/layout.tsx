import clsx from 'clsx'
import { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { Header } from '~/components/header'
import { Image } from '~/components/image'
import { Main } from '~/components/main'
import { ModeSelect } from './mode-select'
import { ThemeSelect } from './theme-select'

type Mode = 'light' | 'dark'

export function Layout({ children }: React.PropsWithChildren<{}>) {
  const [mode] = useLocalStorageState<Mode>('mode', {
    ssr: true,
    defaultValue: 'light',
  })

  const [currentMode, setCurrentMode] = useState<Mode>('light')

  useEffect(() => {
    setCurrentMode(mode)
  }, [mode])

  return (
    <div className={clsx('lg:grid', currentMode === 'dark' ? 'bg-black' : '')}>
      <Image
        className={clsx(
          'absolute left-1/2 top-1/2 hidden h-full max-h-screen w-full -translate-x-1/2 -translate-y-1/2 transform overflow-hidden object-cover  grayscale lg:block',
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
