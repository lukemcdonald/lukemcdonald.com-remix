import clsx from 'clsx'

import Link from '~/components/link'
import Logo from '~/components/logo'
import Nav from '~/components/navMenu'
import type { MenuLink } from '~/components/navMenu'

const menuLinks: MenuLink[] = [
  {
    name: 'Work',
    to: '#',
    links: [
      {
        name: 'AudioTheme',
        to: '/work/audiotheme',
      },
      {
        name: 'Blazer Six',
        to: '/work/blazer-six',
      },
      {
        name: 'Cedaro',
        to: '/work/cedaro',
      },
    ],
  },
  {
    name: 'Play',
    to: '#',
    links: [
      {
        name: 'TREAD Talks',
        to: 'https://gettreadtalks.com/',
      },
    ],
  },
  {
    name: 'Live',
    to: '#',
    links: [
      {
        name: 'Faith',
        to: '/i-am-a/christian',
      },
      {
        name: 'Marriage',
        to: '/i-am-a/husband',
      },
      {
        name: 'Kids',
        to: '/i-am-a/father',
      },
      {
        name: 'Coaching',
        to: '/i-am-a/coach',
      },
    ],
  },
]

export default function Header() {
  return (
    <header
      className={clsx(
        'absolute top-0 left-0 flex items-center p-5 w-full z-50 lg:w-1/2 ',
        'site-header',
      )}
    >
      <Link
        to="/"
        className="relative z-10 inline-flex items-center text-white no-underline bg-white group whitespace-nowrap hover:shadow-lg peer"
      >
        <Logo className="w-16 h-16 p-4 fill-current bg-primary-900" />

        <h1 className="absolute flex items-center h-16 px-0 overflow-hidden text-xl font-bold tracking-wide uppercase transition-all duration-150 bg-white shadow-lg left-16 group-hover:px-4 max-w-0 group-hover:max-w-6xl text-primary-900 group-hover:duration-300">
          Luke McDonald
        </h1>
      </Link>

      <Nav className="px-4 duration-200 peer-hover:opacity-0 peer-hover:duration-0 peer-hover:delay-0">
        {menuLinks.map(menuLink => (
          <Nav.Menu key={menuLink.name} link={menuLink} />
        ))}
      </Nav>
    </header>
  )
}
