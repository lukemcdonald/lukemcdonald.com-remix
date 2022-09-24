import clsx from 'clsx'
import React from 'react'
import { NavLink } from '@remix-run/react'
import { ArrowTopRightOnSquareIcon as ExternalLinkIcon } from '@heroicons/react/20/solid'

import type { NavLinkProps } from '~/types'

const Link: React.FC<NavLinkProps> = ({
  activeClassName,
  children,
  className,
  inactiveClassName,
  showExternalIcon,
  to,
  ...props
}) => {
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
    <a href={to.toString()} className={className} {...props}>
      {children}
      {showExternalIcon && <ExternalLinkIcon className="float-right ml-2 h-4 w-4 opacity-40" />}
    </a>
  )
}

export { Link }
