import React from 'react'
import clsx from 'clsx'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

import type { NavMenuProps } from '~/types'
import Link from '~/components/link'

export const NavMenu = ({
  as = 'div',
  children,
  className,
  link,
}: NavMenuProps) => (
  <Menu
    as={as}
    className={clsx('testing relative inline-block text-left', className)}
  >
    <Menu.Button className="text-primary-900 inline-flex justify-center rounded-md bg-black bg-opacity-0 px-3 py-2 text-base uppercase tracking-wide hover:bg-opacity-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      <span>{link.name}</span>
      <ChevronDownIcon
        className="text-primary-900 mt-px ml-1 h-5 w-5"
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
        <Menu.Items className="divide-primary-100 absolute left-0 z-10 mt-2 w-44 origin-top-left divide-y rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {link.links.map(item => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link
                    className={clsx(
                      active ? 'bg-primary-200' : 'text-primary-900',
                      'group flex w-full items-center rounded px-3 py-2 text-base',
                    )}
                    to={item.to}
                    showExternalIcon={true}
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
