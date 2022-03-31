import clsx from 'clsx'
import { NavLink } from 'remix'
import { ExternalLinkIcon } from '@heroicons/react/solid'

import type { LinkProps } from '~/types'

export function Link({
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
        <ExternalLinkIcon className="float-right ml-2 h-4 w-4 opacity-40" />
      )}
    </a>
  )
}
