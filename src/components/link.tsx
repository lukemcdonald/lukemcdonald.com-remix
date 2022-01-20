import { NavLink } from 'remix'
import clsx from 'clsx'
import { ExternalLinkIcon } from '@heroicons/react/solid'

import type { LinkProps } from '~/types'

export default function Link({
  activeClassName,
  inactiveClassName,
  children,
  className,
  to,
  showExternalIcon,
  ...other
}: LinkProps) {
  // This example assumes that any internal link will start with exactly
  // one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to.toString())

  if (internal) {
    return (
      <NavLink
        to={to}
        rel="canonical"
        prefetch="intent"
        className={({ isActive }) =>
          clsx(
            { activeClassName: isActive, inactiveClassName: !isActive },
            className,
          )
        }
        {...other}
      >
        {children}
      </NavLink>
    )
  }

  return (
    <a href={to.toString()} className={className} {...other}>
      {children}{' '}
      {showExternalIcon && (
        <ExternalLinkIcon className="float-right w-4 h-4 ml-2 opacity-40" />
      )}
    </a>
  )
}
