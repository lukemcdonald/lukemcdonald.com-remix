import clsx from 'clsx'

import type { EntryHeaderProps } from '~/types'
import { Mountains } from '~/components/mountains'

export function EntryHeader({ description, subtitle, title }: EntryHeaderProps) {
  return (
    <header
      className={clsx(
        'entry__header',
        'relative flex flex-col justify-center overflow-hidden bg-primary-500 px-5 pb-30vw pt-32 text-primary-900 sm:px-10 lg:pb-10 xl:py-20'
      )}
      style={{
        backgroundSize: '120%',
      }}
    >
      <div className="relative z-10">
        {subtitle && (
          <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-primary-800">
            {subtitle}
          </div>
        )}

        <h1 className="mb-6 text-5xl font-semibold">{title}.</h1>

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
