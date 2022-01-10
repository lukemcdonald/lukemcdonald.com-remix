import React from 'react'
import { NavLink } from 'remix'
import clsx from 'clsx'

interface LinkProps {
  className?: string | undefined
  inactiveClassName?: string | undefined
  activeClassName?: string | undefined
  children: React.ReactNode
  to: string
}

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
  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return (
      <NavLink
        to={to}
        rel="canonical"
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
    <a href={to} {...other}>
      {children}
    </a>
  )
}
