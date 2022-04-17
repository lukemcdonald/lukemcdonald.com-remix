import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import useLocalStorageState from 'use-local-storage-state'

interface ThemeOption {
  label: string
  classes: {
    light: string
    dark: string
  }
}

const options = [
  { label: 'Green', classes: { light: '#9cd075', dark: '#15824e' } },
  { label: 'Blue', classes: { light: '#38bdf8', dark: '#0369a1' } },
  { label: 'Purple', classes: { light: '#818cf8', dark: '#4338ca' } },
  { label: 'Yellow', classes: { light: '#fde047', dark: '#facc15' } },
  { label: 'Orange', classes: { light: '#fb923c', dark: '#ea580c' } },
  { label: 'Gray', classes: { light: '#a8a29e', dark: '#44403c' } },
]

type Mode = 'light' | 'dark'

export function ThemeSelect() {
  const [theme, setTheme] = useLocalStorageState('theme', {
    ssr: true,
    defaultValue: options[0],
  })
  const [mode] = useLocalStorageState<Mode>('mode', {
    defaultValue: 'light',
  })

  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(options[0])
  const [currentMode, setCurrentMode] = useState<Mode>('light')

  useEffect(() => {
    setCurrentTheme(theme)
  }, [theme])

  useEffect(() => {
    setCurrentMode(mode)
  }, [mode])

  function getThemeColor(option: ThemeOption) {
    let color = options[0].classes.dark

    if (option?.classes) {
      console.log({ option, mode })
      const { light, dark } = option.classes
      color = currentMode === 'dark' ? light : dark
    }

    return color
  }

  // useEffect(() => {
  //   const currentThemeIndex = options.findIndex((object) => {
  //     return object.label === currentTheme.label
  //   })

  //   const interval = setInterval(() => {
  //     if (currentThemeIndex === options.length - 1) {
  //       setCurrentTheme(options[0])
  //     } else {
  //       setCurrentTheme(options[currentThemeIndex + 1])
  //     }
  //   }, 2000)
  //   return () => clearInterval(interval)
  // }, [theme, currentTheme])

  return (
    <Listbox value={theme} onChange={setTheme}>
      <div className="theme-select relative">
        <Listbox.Button className="py-2 px-2" data-theme={currentTheme.label.toLocaleLowerCase()}>
          <div
            className="h-[1.15rem] w-[1.15rem] rounded-full"
            style={{ backgroundColor: getThemeColor(currentTheme) }}
          />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute max-h-60 w-full overflow-auto outline-none">
            {options.map((option) => (
              <Listbox.Option key={option.label.toLowerCase()} value={option} as={Fragment}>
                {({ active, selected }) => (
                  <li className={clsx(`relative select-none`)}>
                    <button className={`block w-full py-1 px-2`}>
                      <span
                        className="inline-block h-4 w-4 rounded-full"
                        style={{ background: getThemeColor(option) }}
                      />
                      <span className="sr-only text-primary-400">{option.label}</span>
                    </button>
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
