import { ArrowTopRightOnSquareIcon as ExternalLinkIcon } from '@heroicons/react/20/solid'
import { NavLink } from '@remix-run/react'
import clsx from 'clsx'

import type { NavLinkProps } from '~/types'

function Link({
  activeClassName,
  children,
  className,
  inactiveClassName,
  showExternalIcon,
  to,
  ...props
}: NavLinkProps) {
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
            {
              activeClassName: isActive,
              inactiveClassName: !isActive,
            },
            className
          )
        }
        {...props}
      >
        {children}
      </NavLink>
    )
  }

  return (
    /* @ts-ignore  */
    <a href={to.toString()} className={className} {...props}>
      {children}
      {showExternalIcon && <ExternalLinkIcon className="float-right ml-2 h-4 w-4 opacity-40" />}
    </a>
  )
}

export { Link }
