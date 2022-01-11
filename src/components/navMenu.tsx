import React from 'react'
import clsx from 'clsx'

import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

import Link from '~/components/link'

export type MenuLink = {
  name: string
  to: string
  links?: MenuLinks
}

export type MenuLinks = MenuLink[]

interface NavMenuProps {
  as?: React.ElementType
  children?: React.ReactNode
  className?: string
  link: MenuLink
}

export const NavMenu = ({
  as = 'div',
  children,
  className,
  link,
}: NavMenuProps) => (
  <Menu
    as={as}
    className={clsx('relative inline-block text-left testing', className)}
  >
    <Menu.Button className="inline-flex justify-center px-3 py-2 text-base tracking-wide uppercase bg-black bg-opacity-0 rounded-md text-primary-900 hover:bg-opacity-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      <span>{link.name}</span>
      <ChevronDownIcon
        className="w-5 h-5 mt-px ml-1 text-primary-900"
        aria-hidden="true"
      />
    </Menu.Button>

    {link?.links && (
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 origin-top-left bg-white divide-y rounded-md shadow-lg w-44 focus:outline-none divide-primary-100 ring-1 ring-black ring-opacity-5">
          <div className="px-1 py-1">
            {link.links.map(item => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    className={clsx(
                      active ? 'bg-primary-200' : 'text-primary-900',
                      'group flex rounded items-center w-full px-3 py-2 text-base',
                    )}
                    to={item.to}
                  >
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    )}

    {children}
  </Menu>
)

interface NavProps {
  children: React.ReactNode
  className?: string
}

export default class Nav extends React.Component<NavProps, {}> {
  static Menu = NavMenu

  render() {
    const { children, className } = this.props

    return <nav className={className}>{children}</nav>
  }
}
