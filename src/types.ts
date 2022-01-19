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
}

export interface EntryProps {
  html?: string
  image?: string
  imageAlt?: string
  description?: string
  subtitle?: string
  title: string
}

export interface EntryImgProps {
  alt: string
  src: string
  srcSet: string
  sizes: string
}

export type EntryHeaderProps = Omit<EntryProps, 'html' | 'image'>
