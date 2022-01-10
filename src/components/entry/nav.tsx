import React from 'react'
import clsx from 'clsx'
import { Email } from 'react-obfuscate-email'
import Link from '~/components/link'

export default function EntryNav({ title }: { title?: string }) {
  const linkStyles =
    'block tracking-wide no-underline uppercase border-b-2 border-transparent text-inherit hover:border-primary-500'

  return (
    <div
      className={clsx(
        'entry__nav',
        `bg-white text-primary-900 px-5 py-10 sm:px-10 lg:py-8 xl:py-12`,
      )}
    >
      <h1 className="mb-6 text-3xl font-normal">{title || 'Connect.'}</h1>

      <div className="inline-flex items-center">
        <Link to="https://github.com/lukemcdonald" className={linkStyles}>
          GitHub
        </Link>

        <span className="w-24 mx-4 border-b" />

        <Email className={linkStyles} email="thelukemcdonald@gmail.com">
          Email
        </Email>
      </div>
    </div>
  )
}
