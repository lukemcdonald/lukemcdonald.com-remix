import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from '~/hooks/use-theme'

export function ModeSelect() {
  const { data, setMode } = useTheme()

  function handleMode() {
    setMode(data.mode === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      onClick={handleMode}
      className="flex items-center py-1 px-1 transition hover:scale-125"
    >
      {data.mode === 'dark' ? (
        <SunIcon className="h-6 w-6 text-primary-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-primary-700" />
      )}
    </button>
  )
}
