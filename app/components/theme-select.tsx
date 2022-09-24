import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import clsx from 'clsx'
import useLocalStorageState from 'use-local-storage-state'

export const themeOptions = [
  { label: 'Gray', colors: { light: '#abab9d', dark: '#3e504f' } },
  { label: 'Green', colors: { light: '#9cd075', dark: '#15824e' } },
  { label: 'Blue', colors: { light: '#38bdf8', dark: '#0369a1' } },
  { label: 'Purple', colors: { light: '#818cf8', dark: '#4338ca' } },
  { label: 'Yellow', colors: { light: '#fde047', dark: '#facc15' } },
  { label: 'Orange', colors: { light: '#fb923c', dark: '#ea580c' } },
]

export type Mode = 'light' | 'dark'
export type ThemeOption = typeof themeOptions[number]
export type ThemeSelectData = {
  mode: Mode
  theme: ThemeOption
}

export const defaults: ThemeSelectData = {
  mode: 'light',
  theme: themeOptions[0],
}

function getThemeColor({ mode, theme }: ThemeSelectData) {
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
  const currentThemeData = {
    theme: currentTheme,
    mode: currentMode,
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
        <Listbox.Button className="py-2 px-2" data-theme={currentTheme.label.toLocaleLowerCase()}>
          <div
            className="h-[1.15rem] w-[1.15rem] rounded-full"
            style={{
              backgroundColor: getThemeColor(currentThemeData),
            }}
          />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute max-h-60 w-full overflow-auto outline-none">
            {themeOptions.map((option) => (
              <Listbox.Option key={option.label.toLowerCase()} value={option} as={Fragment}>
                {({ active, selected }) => (
                  <li className={clsx(`relative select-none`)}>
                    <button className={`block w-full py-1 px-2`}>
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
