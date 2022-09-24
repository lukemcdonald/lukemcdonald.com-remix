import type { NavLinkProps as RemixNavLinkProps } from '@remix-run/react'

export interface RequestInfo {
  requestInfo: {
    origin: string
    pathname: string
  }
}

export interface Content {
  description: string
  draft: boolean
  html: string
  image: string
  imageAlt: string
  markdown: string
  subtitle: string
  title: string
}

export interface MenuLink {
  links?: MenuLink[]
  name: string
  to: string
}

export interface ImageProps {
  alt: string
  className?: string
  sizes?: string[]
  src: string
  style?: any
  widths?: number[]
}

export interface NavLinkProps extends RemixNavLinkProps {
  activeClassName?: string
  className?: string
  inactiveClassName?: string
  showExternalIcon?: boolean
}

export interface NavMenuProps {
  as?: React.ElementType
  children?: React.ReactNode
  className?: string
  link: MenuLink
}

export type EntryProps = Partial<Omit<Content, 'markdown' | 'draft'>>
export type EntryHeaderProps = Omit<EntryProps, 'html' | 'image'>
export type ThemeMode = 'light' | 'dark'
export enum ThemeColor {
  blue = 'Blue',
  gray = 'Gray',
  green = 'Green',
  orange = 'Orange',
  purple = 'Purple',
  yellow = 'Yellow',
}
export interface ThemeOption {
  colors: {
    dark: string
    light: string
  }
  label: ThemeColor
}
export interface ThemeData {
  mode: ThemeMode
  theme: ThemeOption
}
