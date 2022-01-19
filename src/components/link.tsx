import { NavLink } from 'remix'
import clsx from 'clsx'

import type { LinkProps } from '~/types'

export default function Link({
  activeClassName,
  inactiveClassName,
  children,
  className,
  to,
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
      {children}
    </a>
  )
}
