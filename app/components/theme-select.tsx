import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import useLocalStorageState from 'use-local-storage-state'
import { SwatchIcon } from '@heroicons/react/24/outline'
import { ThemeColor } from '~/types'
import type { ThemeData } from '~/types'

export const themeOptions = [
  { label: ThemeColor.gray, colors: { light: '#abab9d', dark: '#3e504f' } },
  { label: ThemeColor.green, colors: { light: '#9cd075', dark: '#15824e' } },
  { label: ThemeColor.blue, colors: { light: '#38bdf8', dark: '#0369a1' } },
  { label: ThemeColor.purple, colors: { light: '#818cf8', dark: '#4338ca' } },
  { label: ThemeColor.yellow, colors: { light: '#fde047', dark: '#facc15' } },
  { label: ThemeColor.orange, colors: { light: '#fb923c', dark: '#ea580c' } },
]

export const defaults: ThemeData = {
  mode: 'light',
  theme: themeOptions[0],
}

function getThemeColor({ mode, theme }: ThemeData) {
  let color = themeOptions[0].colors.dark

  if (theme?.colors) {
    const { light, dark } = theme.colors
    color = mode === 'dark' ? light : dark
  }

  return color
}

export function ThemeSelect() {
  const [mode] = useLocalStorageState('mode', {
    defaultValue: defaults.mode,
  })
  const [theme, setTheme] = useLocalStorageState('theme', {
    defaultValue: defaults.theme,
  })
  const [currentMode, setCurrentMode] = useState(defaults.mode)
  const [currentTheme, setCurrentTheme] = useState(defaults.theme)
  const [open, setOpen] = useState(false)
  const currentThemeData = {
    theme: currentTheme,
    mode: currentMode,
  }

  function handleButtonToggle() {
    setOpen(!open)
  }

  useEffect(() => {
    setCurrentTheme(theme)
  }, [theme])

  useEffect(() => {
    setCurrentMode(mode)
  }, [mode])

  return (
    <Listbox value={theme} onChange={setTheme}>
      <div className="theme-select relative">
        <Listbox.Button
          className={clsx('py-2 px-2 transition hover:scale-125', open ? 'scale-125' : '')}
          onClick={handleButtonToggle}
          data-theme={currentTheme.label.toLocaleLowerCase()}
        >
          <SwatchIcon
            className="h-6 w-6 text-primary-400"
            style={{
              color: getThemeColor(currentThemeData),
            }}
          />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="no-scrollbar absolute max-h-60 w-full overflow-auto outline-none">
            {themeOptions
              .filter((option) => option.label !== currentThemeData.theme.label)
              .map((option) => (
                <Listbox.Option key={option.label.toLowerCase()} value={option} as={Fragment}>
                  {({ active, selected }) => (
                    <li className="relative select-none transition hover:scale-125">
                      <button className="block w-full py-1 px-2" onClick={handleButtonToggle}>
                        <span
                          className="inline-block h-4 w-4 rounded-full"
                          style={{
                            background: getThemeColor({ ...currentThemeData, theme: option }),
                          }}
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
