import { RemixLinkProps } from '@remix-run/react/components'

export interface RequestInfo {
  requestInfo: {
    origin: string
    pathname: string
  }
}

export interface Content {
  draft: boolean
  html: string
  image: string
  imageAlt: string
  markdown: string
  description: string
  subtitle: string
  title: string
}

export interface LinkProps extends RemixLinkProps {
  inactiveClassName?: string
  activeClassName?: string
  showExternalIcon?: boolean
}

export interface MenuLink {
  name: string
  to: string
  links?: MenuLink[]
}

export interface NavMenuProps {
  as?: React.ElementType
  children?: React.ReactNode
  className?: string
  link: MenuLink
}

export type EntryProps = Partial<Omit<Content, 'markdown' | 'draft'>>
export type EntryHeaderProps = Omit<EntryProps, 'html' | 'image'>
