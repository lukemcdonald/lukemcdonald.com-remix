import clsx from 'clsx'

import type { EntryHeaderProps } from '~/types'
import { Mountains } from '~/components/mountains'

export default function EntryHeader({
  description,
  subtitle,
  title,
}: EntryHeaderProps) {
  return (
    <header
      className={clsx(
        'entry__header',
        'relative overflow-hidden bg-primary-500 justify-center flex flex-col px-5 pt-32 pb-10 text-primary-900 sm:px-10 xl:py-20',
      )}
      style={{
        backgroundSize: '120%',
      }}
    >
      <div className="relative z-10">
        {subtitle && (
          <div className="mb-1 text-sm font-semibold tracking-wider uppercase text-primary-800">
            {subtitle}
          </div>
        )}

        <h1 className="mb-6 text-5xl font-semibold">{title}</h1>

        {description && (
          <div
            className="text-lg leading-normal"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>

      <Mountains className="absolute bottom-0 left-0 z-0 w-full" />
    </header>
  )
}
