import useLocalStorageState from 'use-local-storage-state'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

type Mode = 'light' | 'dark'

export function ModeSelect() {
  const [mode, setMode] = useLocalStorageState<Mode>('mode', {
    defaultValue: 'light',
  })

  const [currentMode, setCurrentMode] = useState<Mode>('light')

  useEffect(() => {
    setCurrentMode(mode)
  }, [mode])

  function handleMode() {
    if (mode === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  return (
    <button
      type="button"
      onClick={handleMode}
      className="flex items-center py-1 px-1 transition hover:scale-125"
    >
      {currentMode === 'dark' ? (
        <SunIcon className="h-6 w-6 text-primary-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-primary-700" />
      )}
    </button>
  )
}
