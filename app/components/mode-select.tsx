import { Listbox, Transition } from '@headlessui/react'
import { MoonIcon, SunIcon, ComputerDesktopIcon as SystemIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'

import type { ThemeMode } from '~/hooks/use-theme'
import { MODES, useTheme } from '~/hooks/use-theme'

type ModeIconProps = React.RefAttributes<SVGSVGElement> & { className?: string }
type ModeIcon = (props: ModeIconProps) => JSX.Element

function getModeIcon(mode: ThemeMode) {
  switch (mode.label) {
    case 'dark':
      return {
        icon: (props: ModeIconProps) => <MoonIcon {...props} />,
      }
    case 'light':
      return {
        icon: (props: ModeIconProps) => <SunIcon {...props} />,
      }
    default:
      return {
        icon: (props: ModeIconProps) => <SystemIcon {...props} />,
      }
  }
}

export function ModeSelect() {
  const { data, setMode } = useTheme()
  const [open, setOpen] = useState(false)
  const [selectedMode, setSelectedMode] = useState<ThemeMode>(data.mode)
  const [{ icon: SelectedIcon }, setSelectedIcon] = useState<Record<'icon', ModeIcon>>(
    getModeIcon(data.mode)
  )

  useEffect(() => {
    setSelectedMode(data.mode)
    setSelectedIcon(getModeIcon(data.mode))
  }, [data])

  function handleButtonToggle() {
    setOpen(!open)
  }

  function handleModeChange(value: ThemeMode) {
    setMode(value)
    setSelectedMode(value)
    setSelectedIcon(getModeIcon(value))
  }

  return (
    <Listbox value={selectedMode} onChange={handleModeChange}>
      <div className="mode-select relative" data-mode={selectedMode.label}>
        <Listbox.Button className="py-2 px-2 transition" onClick={handleButtonToggle}>
          <SelectedIcon
            className={clsx(
              'h-6 w-6',
              selectedMode.value === 'light' ? 'text-primary-700' : 'text-primary-400'
            )}
          />
          <span className="sr-only capitalize text-primary-400">{selectedMode.label}</span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="no-scrollbar absolute right-0 w-28 overflow-auto rounded-lg bg-primary-300 py-1 outline-none">
            {MODES.map((option) => {
              return (
                <Listbox.Option as={Fragment} key={option.label} value={option}>
                  {({ active, selected }) => {
                    const { icon: OptionIcon } = getModeIcon(option)
                    return (
                      <li
                        className={clsx(
                          'relative select-none transition',
                          active && !selected ? 'opacity-60' : 'opacity-100',
                          selected ? 'font-bold' : 'font-normal'
                        )}
                      >
                        <button
                          className="flex w-full items-center gap-2 py-2 px-3"
                          onClick={handleButtonToggle}
                        >
                          <OptionIcon className="h-5 w-5" />
                          <span className="text-sm capitalize">{option.label}</span>
                        </button>
                      </li>
                    )
                  }}
                </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
