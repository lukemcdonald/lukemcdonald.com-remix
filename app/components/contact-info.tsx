import clsx from 'clsx'
import React from 'react'

import { Link } from '~/components/link'

const contactLinks = [
  { name: 'GitHub', to: 'https://github.com/lukemcdonald' },
  { name: 'Email', to: 'mailto:thelukemcdonald@gmail.com' },
]

export function ContactInfo({ title }: { title?: string }) {
  return (
    <div
      className={clsx(
        'entry__nav',
        `bg-white px-5 py-10 text-primary-900 sm:px-10 lg:py-8 xl:py-12`
      )}
    >
      <h1 className="mb-6 text-3xl font-normal">{title || 'Connect.'}</h1>

      <div className="inline-flex items-center">
        {contactLinks.map((link) => (
          <React.Fragment key={link.name}>
            <Link
              to={link.to}
              className="block border-b-2 border-transparent uppercase tracking-wide text-inherit no-underline hover:border-primary-500"
            >
              {link.name}
            </Link>
            <span className="mx-4 w-24 border-b last:hidden" />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
