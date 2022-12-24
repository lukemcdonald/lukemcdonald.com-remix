import { Fragment, useState } from 'react'
import clsx from 'clsx'
import { Listbox, Transition } from '@headlessui/react'
import { MoonIcon, SunIcon, ComputerDesktopIcon as SystemIcon } from '@heroicons/react/24/outline'

import { useTheme, MODES, THEMES } from '~/hooks/use-theme'
import type { ThemeMode } from '~/types'

type ModeIconProps = React.SVGProps<SVGSVGElement>

function getModeIcon(mode: ThemeMode) {
  switch (mode) {
    case 'dark':
      return {
        icon: (props: ModeIconProps) => <MoonIcon {...props} />,
      }
    case 'light':
      return {
        icon: (props: ModeIconProps) => <SunIcon {...props} />,
      }
    case 'system':
      return {
        icon: (props: ModeIconProps) => <SystemIcon {...props} />,
      }
  }
}

function getListboxClass(mode: ThemeMode) {
  switch (mode) {
    case 'dark':
      return 'bg-primary-400'
    case 'light':
      return 'bg-primary-700'
    case 'system':
      return 'bg-primary-400'
  }
}

function getSelectedClass(mode: ThemeMode) {
  switch (mode) {
    case 'dark':
      return 'bg-primary-500'
    case 'light':
      return 'bg-primary-800'
    case 'system':
      return 'bg-primary-500'
  }
}

export function ModeSelect() {
  const { data, setMode } = useTheme()
  const [open, setOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState(data.mode)
  const { icon: Icon } = getModeIcon(selectedMode)

  function handleButtonToggle() {
    setOpen(!open)
  }

  function handleModeChange(value: ThemeMode) {
    setMode(value)
    setSelectedMode(value)
  }

  return (
    <Listbox value={selectedMode} onChange={handleModeChange}>
      <div className="theme-select relative">
        <Listbox.Button
          className="py-2 px-2 transition"
          data-theme={selectedMode}
          onClick={handleButtonToggle}
        >
          <Icon
            className={clsx(
              'h-6 w-6',
              data.mode === 'light' ? 'text-primary-700' : 'text-primary-400'
            )}
          />
          <span className="sr-only capitalize text-primary-400">{selectedMode}</span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={clsx(
              'no-scrollbar absolute right-0 w-28 overflow-auto rounded-lg py-1 outline-none',
              getListboxClass(data.mode)
            )}
          >
            {MODES.map((option) => (
              <Listbox.Option key={option} value={option} as={Fragment}>
                {({ active, selected }) => {
                  const { icon: OptionIcon } = getModeIcon(option)

                  return (
                    <li
                      className={clsx(
                        'relative select-none transition',
                        active ? getSelectedClass(selectedMode) : '',
                        selected ? getSelectedClass(selectedMode) : ''
                      )}
                    >
                      <button
                        className={clsx(
                          'flex w-full items-center gap-2 py-2 px-3',
                          data.mode === 'light' ? 'invert' : ''
                        )}
                        onClick={handleButtonToggle}
                      >
                        <OptionIcon className="h-5 w-5" />
                        <span className="text-sm font-semibold capitalize">{option}</span>
                      </button>
                    </li>
                  )
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
