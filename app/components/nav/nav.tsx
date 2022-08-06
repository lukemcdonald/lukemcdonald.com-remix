import React from 'react'
import NavMenu from './nav-menu'

interface NavProps {
  children: React.ReactNode
  className?: string
}

function Nav({ children, className }: NavProps) {
  return <nav className={className}>{children}</nav>
}

export default Object.assign(Nav, {
  Menu: NavMenu,
})
