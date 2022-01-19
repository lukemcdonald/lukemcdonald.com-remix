import React from 'react'
import clsx from 'clsx'
import Link from '~/components/link'

const contactLinks = [
  { name: 'GitHub', to: 'https://github.com/lukemcdonald' },
  { name: 'Email', to: 'mailto:thelukemcdonald@gmail.com' },
]

export default function ContactInfo({ title }: { title?: string }) {
  return (
    <div
      className={clsx(
        'entry__nav',
        `bg-white text-primary-900 px-5 py-10 sm:px-10 lg:py-8 xl:py-12`,
      )}
    >
      <h1 className="mb-6 text-3xl font-normal">{title || 'Connect.'}</h1>

      <div className="inline-flex items-center">
        {contactLinks.map(link => (
          <React.Fragment key={link.name}>
            <Link
              to={link.to}
              className="block tracking-wide no-underline uppercase border-b-2 border-transparent text-inherit hover:border-primary-500"
            >
              {link.name}
            </Link>
            <span className="w-24 mx-4 border-b last:hidden" />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
